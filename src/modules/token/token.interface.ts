import { IUser } from 'src/types/entities/User';

export interface ISaveTokenPayload {
  user: IUser;
  refresh_token: string;
}
