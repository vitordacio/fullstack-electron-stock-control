import { User } from '@entities/User/User';

export interface ILoginDTO {
  login: string;
  password: string;
}

export interface ILoginResponse {
  user: User;
  accessToken: string;
}
