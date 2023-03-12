import { Commission } from '../../commission/commission.entity';
import { ContestStatus } from '../../contest-status/contest-status.entity';
import { Vacancy } from '../../vacancy/vacancy.entity';
import { RequiredDoc } from '../../required-doc/required-doc.entity';
import { ContestStage } from '../../contest-stage/contest-stage.entity';

export class ContestDto {
  email: string;

  address: string;

  name: string;

  start_date: string;

  end_date: string;

  terms: string;

  description: string;

  conditions: string;

  commission: Commission;

  contest_status: ContestStatus;

  vacancies: Vacancy[];

  stages: ContestStage[];

  required_docs: RequiredDoc[];

  constructor(payload) {
    this.email = payload.email;
    this.address = payload.address;
    this.name = payload.name;
    this.start_date = payload.start_date;
    this.end_date = payload.end_date;
    this.terms = payload.terms;
    this.description = payload.description;
    this.conditions = payload.conditions;
    this.commission = payload.commission;
    this.contest_status = payload.contest_status;
    this.vacancies = payload.vacancies;
    this.stages = payload.stages;
    this.required_docs = payload.required_docs;
  }
}
