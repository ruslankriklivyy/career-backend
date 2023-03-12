import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Decision } from './decision.entity';
import { queryBuilder } from '../../helpers/query-builder.helper';
import { DecisionDto } from './dto/decision.dto';
import { ContestService } from '../contest/contest.service';
import { VacancyService } from '../vacancy/vacancy.service';
import { FileService } from '../file/file.service';

@Injectable()
export class DecisionService {
  constructor(
    @InjectRepository(Decision)
    private readonly decisionRepository: Repository<Decision>,
    private readonly contestService: ContestService,
    private readonly vacancyService: VacancyService,
    private readonly fileService: FileService,
  ) {}

  async getAll(payload) {
    const options = queryBuilder<Decision>(payload);

    const [items, count] = await this.decisionRepository.findAndCount({
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

  getDecisionByVacancyId(vacancyId: number) {
    return this.decisionRepository.findOne({
      where: { vacancy: { id: vacancyId } },
    });
  }

  async createOne(payload) {
    const dirtyData = (payload.data && JSON.parse(payload.data)) || {};

    try {
      const decisionDto = new DecisionDto({
        ...dirtyData,
        commission: { id: dirtyData.commission_id },
        decision_type: { id: dirtyData.decision_type_id },
        contest: { id: dirtyData.contest_id },
        vacancy: { id: dirtyData.vacancy_id },
      });

      const vacancyByContest =
        await this.vacancyService.getOneVacancyByContestId(
          dirtyData.contest_id,
          dirtyData.vacancy_id,
        );
      const decisionByVacancy = await this.getDecisionByVacancyId(
        dirtyData.vacancy_id,
      );

      if (!vacancyByContest) {
        throw new HttpException(
          'Vacancy is not exist in this contest',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!!decisionByVacancy) {
        throw new HttpException(
          'Decision for this vacancy is already exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const decision = await this.decisionRepository.save(decisionDto);
      await this.contestService.closeContest(decision.contest.id);

      if (payload.files.length) {
        await this.fileService.createMany({
          userId: payload.userId,
          decisionId: decision.id,
          files: payload.files,
        });
      }

      return this.decisionRepository.findOne({ where: { id: decision.id } });
    } catch (error) {
      throw error;
    }
  }

  async updateOne(id: number, payload) {
    try {
      const dirtyData = (payload.data && JSON.parse(payload.data)) || {};
      const newDecision = new DecisionDto({
        ...payload,
        commission: { id: dirtyData.commission_id },
        decision_type: { id: dirtyData.decision_type_id },
      });
      await this.decisionRepository.save({ id, ...newDecision });

      if (payload.files.length) {
        await this.fileService.createMany({
          userId: payload.userId,
          decisionId: id,
          files: payload.files,
        });
      }

      return this.decisionRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
