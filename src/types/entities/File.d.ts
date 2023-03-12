import { IUser } from './User';

export interface IFile {
  name: string;
  file_url: string;
  file_name: string;
  user: IUser;
}
