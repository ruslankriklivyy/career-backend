import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as _ from 'lodash';

import { ContestStage } from './contest-stage.entity';
import { ContestStageDto } from './dto/contest-stage.dto';

@Injectable()
export class ContestStageService {
  constructor(
    @InjectRepository(ContestStage)
    private readonly contestStageRepository: Repository<ContestStage>,
  ) {}

  getAllByContest(contestId: number) {
    return this.contestStageRepository.find({
      where: { contest: { id: contestId } },
    });
  }

  async createMany(payload) {
    const formattedContestStages = payload.map((contestStage) => {
      return {
        ...contestStage,
        stage: contestStage.stage_id,
      };
    });
    const contestStages = await this.contestStageRepository
      .createQueryBuilder()
      .insert()
      .into(ContestStage)
      .values(formattedContestStages)
      .returning('*')
      .execute();

    return contestStages.raw;
  }

  async updateMany(contestId: number, payload) {
    try {
      const contestStagesIds = await this.contestStageRepository.find({
        where: { contest: { id: contestId } },
        select: { id: true },
        loadEagerRelations: false,
      });
      const deletionContestStagesIds = _.difference(
        contestStagesIds.map((elem) => elem.id),
        payload.map((elem) => elem.id),
      );

      await this.contestStageRepository.delete({
        id: In(deletionContestStagesIds),
      });

      for (const elem of payload) {
        const newContestStage = new ContestStageDto({
          ...elem,
          stage: { id: elem.stage_id },
        });

        if (!elem.id) {
          await this.contestStageRepository.save({
            ...newContestStage,
            contest: { id: contestId },
          });
        } else {
          await this.contestStageRepository.save({
            ...newContestStage,
            id: elem.id,
          });
        }
      }

      return this.contestStageRepository.find({
        where: { contest: { id: contestId } },
      });
    } catch (error) {
      throw error;
    }
  }
}
