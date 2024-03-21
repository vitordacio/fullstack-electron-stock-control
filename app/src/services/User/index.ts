import api from '../../config/api';
import { AxiosResponse } from 'axios';
import { IUser } from '../../interfaces/user';
import {
  ILogin,
  IAuthResponse,
  ICreateUser,
  IFindByCompany,
  IUpdateUser,
  IUpdateUserPassword,
} from './IUserService';

interface IUserService {
  login: (data: ILogin) => Promise<IAuthResponse>;
  loginToken: () => Promise<IAuthResponse>;
  createUser: (data: ICreateUser) => Promise<IUser>;
  findById: (data: string) => Promise<IUser>;
  findByCompany: (data: IFindByCompany) => Promise<IUser[]>;
  findCountByCompany: () => Promise<number>;
  updateUser: (data: IUpdateUser) => Promise<IUser>;
  updateUserPassword: (data: IUpdateUserPassword) => Promise<IUser>;
  deleteUser: (data: string) => Promise<void>;
  verifyServer: () => Promise<{ message: string }>;
}

const service: IUserService = {
  login: async (data: ILogin): Promise<IAuthResponse> => {
    const response: AxiosResponse<IAuthResponse> = await api.post(
      '/auth',
      data,
    );
    return response.data;
  },
  loginToken: async (): Promise<IAuthResponse> => {
    const response: AxiosResponse<IAuthResponse> = await api.post(
      '/auth/token',
    );
    return response.data;
  },
  createUser: async (data: ICreateUser): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.post('/user', data);
    return response.data;
  },
  findById: async (data: string): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.get(`/user/${data}`);
    return response.data;
  },
  findByCompany: async (data: IFindByCompany): Promise<IUser[]> => {
    const response: AxiosResponse<IUser[]> = await api.get(
      `/user?situation=${data.situation}&name${
        data.name ? `=${data.name}` : ''
      }&page=${data.page || 1}`,
    );
    return response.data;
  },
  findCountByCompany: async (): Promise<number> => {
    const response: AxiosResponse<number> = await api.get(`/user/count`);
    return response.data;
  },
  updateUser: async (data: IUpdateUser): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.put('/user', data);
    return response.data;
  },
  updateUserPassword: async (data: IUpdateUserPassword): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.put(
      '/user/password',
      data,
    );
    return response.data;
  },
  deleteUser: async (data: string): Promise<void> => {
    const response: AxiosResponse<void> = await api.delete(`/user/${data}`);
    return response.data;
  },
  verifyServer: async (): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await api.get(
      '/check',
    );
    return response.data;
  },
};

export const userService: IUserService = service;
