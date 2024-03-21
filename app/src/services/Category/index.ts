import api from '../../config/api';
import { AxiosResponse } from 'axios';
import {
  ICreateCategory,
  IFindByCompany,
  IUpdateCategory,
} from './ICategoryService';
import { ICategory } from '../../interfaces/category';

interface ICategoryService {
  createCategory: (data: ICreateCategory) => Promise<ICategory>;
  findById: (data: string) => Promise<ICategory>;
  findIndex: () => Promise<ICategory[]>;
  findByCompany: (data: IFindByCompany) => Promise<ICategory[]>;
  findCountByCompany: () => Promise<number>;
  updateCategory: (data: IUpdateCategory) => Promise<ICategory>;
  deleteCategory: (data: string) => Promise<void>;
}

const service: ICategoryService = {
  createCategory: async (data: ICreateCategory): Promise<ICategory> => {
    const response: AxiosResponse<ICategory> = await api.post(
      '/category',
      data,
    );
    return response.data;
  },
  findById: async (data: string): Promise<ICategory> => {
    const response: AxiosResponse<ICategory> = await api.get(
      `/category/${data}`,
    );
    return response.data;
  },
  findIndex: async (): Promise<ICategory[]> => {
    const response: AxiosResponse<ICategory[]> = await api.get(
      `/category/index`,
    );
    return response.data;
  },
  findByCompany: async (data: IFindByCompany): Promise<ICategory[]> => {
    const response: AxiosResponse<ICategory[]> = await api.get(
      `/category?name${data.name ? `=${data.name}` : ''}&page=${
        data.page || 1
      }`,
    );
    return response.data;
  },
  findCountByCompany: async (): Promise<number> => {
    const response: AxiosResponse<number> = await api.get(`/category/count`);
    return response.data;
  },
  updateCategory: async (data: IUpdateCategory): Promise<ICategory> => {
    const response: AxiosResponse<ICategory> = await api.put('/category', data);
    return response.data;
  },
  deleteCategory: async (data: string): Promise<void> => {
    const response: AxiosResponse<void> = await api.delete(`/category/${data}`);
    return response.data;
  },
};

export const categoryService: ICategoryService = service;
