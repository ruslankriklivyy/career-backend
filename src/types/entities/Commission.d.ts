import { IUser } from './User';
import { IContest } from './Contest';

export interface ICommission {
  id: number;
  name: string;

  users?: IUser[];
  contests?: IContest[];
}
