import api from '../../config/api';
import { AxiosResponse } from 'axios';
import {
  IFindByCompany,
  ISearchProductByName,
  ICreateProduct,
  IUpdateProduct,
  ICountByCompanyResponse,
} from './IProductService';
import { IProduct } from '../../interfaces/product';

interface IProductService {
  findById: (data: string) => Promise<IProduct>;
  searchByName: (data: ISearchProductByName) => Promise<IProduct[]>;
  findByCompany: (data: IFindByCompany) => Promise<IProduct[]>;
  findCountByCompany: () => Promise<ICountByCompanyResponse>;
  findAlert: (data: string) => Promise<{ products: IProduct[]; count: number }>;
  createProduct: (data: ICreateProduct) => Promise<IProduct>;
  updateProduct: (data: IUpdateProduct) => Promise<IProduct>;
  deleteProduct: (data: string) => Promise<void>;
}

const service: IProductService = {
  findById: async (data: string): Promise<IProduct> => {
    const response: AxiosResponse<IProduct> = await api.get(`/product/${data}`);
    return response.data;
  },
  searchByName: async (data: ISearchProductByName): Promise<IProduct[]> => {
    const response: AxiosResponse<IProduct[]> = await api.get(
      `/product/search?name${data.name && `=${data.name}`}&page=${
        data.page || 1
      }`,
    );
    return response.data;
  },
  findByCompany: async (data: IFindByCompany): Promise<IProduct[]> => {
    const response: AxiosResponse<IProduct[]> = await api.get(
      `/product?situation=${data.situation}&category_id${
        data.category_id ? `=${data.category_id}` : ''
      }&name${data.name ? `=${data.name}` : ''}&page=${data.page || 1}`,
    );
    return response.data;
  },
  findCountByCompany: async (): Promise<ICountByCompanyResponse> => {
    const response: AxiosResponse<ICountByCompanyResponse> = await api.get(
      `/product/count`,
    );
    return response.data;
  },
  findAlert: async (
    data: string,
  ): Promise<{ products: IProduct[]; count: number }> => {
    const response: AxiosResponse<{ products: IProduct[]; count: number }> =
      await api.get(`/product/alert?situation${data ? `=${data}` : ''}`);
    return response.data;
  },
  createProduct: async (data: ICreateProduct): Promise<IProduct> => {
    const response: AxiosResponse<IProduct> = await api.post('/product', data);
    return response.data;
  },
  updateProduct: async (data: IUpdateProduct): Promise<IProduct> => {
    const response: AxiosResponse<IProduct> = await api.put('/product', data);
    return response.data;
  },
  deleteProduct: async (data: string): Promise<void> => {
    const response: AxiosResponse<void> = await api.delete(`/product/${data}`);
    return response.data;
  },
};

export const productService: IProductService = service;
