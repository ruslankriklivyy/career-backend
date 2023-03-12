import { Request } from 'express';

import { Role } from 'src/modules/auth/role.enum';

interface IUser {
  id: number;
  full_name: string;
  email: string;
  password?: string;
  rnokpp: string;
  registration_address: string;
  avatar_url: string;
  phones?: string[];
  user_role: Role;
}

interface IRequestWithUser extends Request {
  user: IUser;
}
