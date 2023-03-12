export interface IGetUserPayload {
  email: string;
  hashedPassword: string;
}

export interface IVerifyPasswordPayload {
  password: string;
  hashedPassword: string;
}

export interface IRegisterPayload {
  body: any;
  avatar: any;
}

export interface ILoginPayload {
  email: string;
  password: string;
}
