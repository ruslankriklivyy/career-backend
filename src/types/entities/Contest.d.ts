import { ICommission } from './Commission';

export interface IContest {
  email: string;

  address: string;

  name: string;

  start_date: string;

  end_date: string;

  terms: string;

  description: string;

  conditions: string;

  commission: ICommission;

  contest_status: ContestStatus;

  vacancies: Vacancy[];

  stages: Stage[];

  required_docs: RequiredDoc[];
}
