import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Contest } from './contest.entity';
import { CreateContestDto } from './dto/create-contest.dto';
import { queryBuilder } from '../../helpers/query-builder.helper';
import { ContestStageService } from '../contest-stage/contest-stage.service';
import { VacancyService } from '../vacancy/vacancy.service';
import { RequiredDoc } from '../required-doc/required-doc.entity';
import { ContestDto } from './dto/contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';

@Injectable()
export class ContestService {
  constructor(
    @InjectRepository(Contest)
    private readonly contestRepository: Repository<Contest>,
    private readonly contestStageService: ContestStageService,
    private readonly vacancyService: VacancyService,
  ) {}

  async getAll(payload) {
    const options = queryBuilder<Contest>(payload);

    const [items, count] = await this.contestRepository.findAndCount({
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
    return this.contestRepository.findOneBy({ id });
  }

  async createOne(payload: CreateContestDto) {
    try {
      const requiredDocs = payload.required_docs.map((id) => ({
        ...new RequiredDoc(),
        id,
      }));

      const stages = await this.contestStageService.createMany(payload.stages);
      const vacancies = await this.vacancyService.createMany(payload.vacancies);

      const newContest = new ContestDto({
        ...payload,
        stages,
        vacancies,
        commission: payload.commission_id,
        contest_status: payload.commission_id,
        required_docs: requiredDocs,
      });

      return this.contestRepository.save(newContest);
    } catch (error) {
      throw error;
    }
  }

  async updateOne(id: number, payload: UpdateContestDto) {
    try {
      const requiredDocs = payload.required_docs.map((id) => ({
        ...new RequiredDoc(),
        id,
      }));
      const contestStages = await this.contestStageService.updateMany(
        id,
        payload.stages,
      );
      const vacancies = await this.vacancyService.updateMany(
        id,
        payload.vacancies,
      );

      const newContest = new ContestDto({
        ...payload,
        vacancies,
        contest_stages: contestStages,
        required_docs: requiredDocs,
      });

      await this.contestRepository.save({ ...newContest, id });

      return this.getOne(id);
    } catch (error) {
      throw error;
    }
  }

  async updateCurrentContestStage(contestId: number, contestStageId: number) {
    try {
      const contestStages = await this.contestStageService.getAllByContest(
        contestId,
      );
      const newContestStages = contestStages.map((contestStage) => {
        if (contestStage.id === +contestStageId) {
          return { ...contestStage, is_current: true };
        }
        return { ...contestStage, is_current: false };
      });

      await this.contestStageService.updateMany(contestId, newContestStages);

      return 'Contest stage updated';
    } catch (error) {
      throw error;
    }
  }

  closeContest(contestId: number) {
    return this.contestRepository.save({
      id: contestId,
      contest_status: { id: 2 },
    });
  }
}
