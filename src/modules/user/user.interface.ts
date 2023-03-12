import { IUser } from 'src/types/entities/User';

export interface ICreateUserPayload {
  user: IUser;
  avatar: any;
}
