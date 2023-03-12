import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';

import { Application } from './application.entity';
import { queryBuilder } from '../../helpers/query-builder.helper';
import { VacancyService } from '../vacancy/vacancy.service';
import { ApplicantService } from '../applicant/applicant.service';
import { ApplicationDto } from './dto/application.dto';
import { ApplicationStageService } from '../application-stage/application-stage.service';
import { FileService } from '../file/file.service';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    private readonly vacancyService: VacancyService,
    private readonly applicantService: ApplicantService,
    private readonly applicationStageService: ApplicationStageService,
    private readonly fileService: FileService,
  ) {}

  async getAll(payload) {
    const options = queryBuilder<Application>(payload);

    const [items, count] = await this.applicationRepository.findAndCount({
      ...options,
    });

    const meta = {
      current_page: +payload?.pagination?.page,
      per_page: +payload?.pagination?.per_page,
      total: count,
    };

    return {
      data: items,
      meta,
    };
  }

  getOne(id: number) {
    return this.applicationRepository.findOne({ where: { id } });
  }

  async createOne(payload) {
    try {
      const dirtyData = (payload.data && JSON.parse(payload.data)) || {};

      const vacancy = await this.vacancyService.getOne(dirtyData.vacancy_id);
      const applicant = await this.applicantService.getOne(
        dirtyData.applicant_id,
      );
      const vacancyByCurrentContestStage =
        await this.vacancyService.getOneVacancyByCurrentContestStage(
          vacancy.id,
        );
      const vacanciesByApplicantRnokpp =
        await this.vacancyService.getOneByApplicantRnokpp(applicant.rnokpp);

      if (!!vacanciesByApplicantRnokpp) {
        throw new HttpException(
          'Application with that rnokpp is already exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const nowDate = new Date();
      const firstContestStage = vacancy.contest.stages.find(
        (stage) => stage.id === 1,
      );
      const isFirstStageEnded =
        nowDate.getTime() <
        moment(firstContestStage.end_date, 'DD.MM.YYYY').toDate().getTime();
      const isContestAvailable =
        vacancy.contest.contest_status.id === 1 &&
        firstContestStage.is_current &&
        isFirstStageEnded;

      if (!isContestAvailable) {
        throw new HttpException(
          'Contest is unavailable',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newApplication = new ApplicationDto({
        vacancy,
        applicant,
        contest_stage: vacancyByCurrentContestStage.contest.stages[0],
        status: { id: 2 },
      });

      const application = await this.applicationRepository.save(newApplication);
      await this.applicationStageService.createOne({
        status: { id: 3 },
        contest_stage: vacancyByCurrentContestStage.contest.stages[0],
        application,
      });

      if (payload.files.length) {
        await this.fileService.createMany({
          userId: payload.userId,
          applicationId: application.id,
          files: payload.files,
        });
      }

      return this.getOne(application.id);
    } catch (error) {
      throw error;
    }
  }
}
