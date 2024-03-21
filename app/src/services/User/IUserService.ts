import { IUser } from '../../interfaces/user';

export interface ILogin {
  login: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export interface ICreateUser {
  name: string;
  email: string;
  username: string;
  role_name: 'adm' | 'user' | '';
  actived: boolean;
}

export interface IUpdateUser {
  user_id: string;
  name: string;
  username: string;
  email: string;
  actived: boolean;
}

export interface IUpdateUserPassword {
  user_id: string;
  password?: string;
  new_password: string;
}

export interface IFindByCompany {
  situation: 'latest' | 'actived_true' | 'actived_false' | 'deleted';
  name: string;
  page?: number;
}
