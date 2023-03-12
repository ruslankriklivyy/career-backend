import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as _ from 'lodash';

import { Vacancy } from './vacancy.entity';
import { State } from '../state/state.entity';
import { City } from '../city/city.entity';
import { SaveVacancyDto } from './dto/create-vacancy.dto';
import { VacancyDto } from './dto/vacancy.dto';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacancyRepository: Repository<Vacancy>,
  ) {}

  getOne(id: number) {
    return this.vacancyRepository.findOne({
      where: { id },
      relations: { contest: true },
    });
  }

  getOneByApplicantRnokpp(rnokpp: string) {
    return this.vacancyRepository.findOne({
      where: { applications: { applicant: { rnokpp } } },
      relations: { applications: true },
    });
  }

  getOneVacancyByCurrentContestStage(id: number) {
    return this.vacancyRepository.findOne({
      where: { id, contest: { stages: { is_current: true } } },
      relations: { contest: { stages: true } },
    });
  }

  getOneVacancyByContestId(contestId: number, vacancyId: number) {
    return this.vacancyRepository.findOne({
      where: { contest: { id: contestId }, id: vacancyId },
    });
  }

  async createMany(payload) {
    const vacancies = payload.map((elem) => {
      const state = new State();
      state.id = elem.state_id;
      const city = new City();
      city.id = elem.city_id;

      return new SaveVacancyDto({
        ...elem,
        state,
        city,
      });
    });

    const newVacancies = await this.vacancyRepository
      .createQueryBuilder()
      .insert()
      .into(Vacancy)
      .values(vacancies)
      .returning('*')
      .execute();
    return newVacancies.raw;
  }

  async updateMany(contestId: number, payload) {
    try {
      const vacanciesIds = await this.vacancyRepository.find({
        where: { contest: { id: contestId } },
        loadEagerRelations: false,
        select: { id: true },
      });

      const deletionVacanciesIds = _.difference(
        vacanciesIds.map((elem) => elem.id),
        payload.map((elem) => elem.id),
      );

      await this.vacancyRepository.delete({ id: In(deletionVacanciesIds) });

      for (const vacancy of payload) {
        const newVacancy = new VacancyDto({
          ...vacancy,
          city: { id: vacancy.city_id },
          state: { id: vacancy.state_id },
        });

        if (!vacancy?.id) {
          await this.vacancyRepository.save({
            ...newVacancy,
            contest: { id: contestId },
          });
        } else {
          await this.vacancyRepository.save({
            ...newVacancy,
            id: vacancy.id,
          });
        }
      }

      return this.vacancyRepository.find({
        where: { contest: { id: contestId } },
      });
    } catch (error) {
      throw error;
    }
  }
}
