import api from '../../config/api';
import { AxiosResponse } from 'axios';
import {
  ICreateSale,
  IFindByCompany,
  IFindByDay,
  IFindByMonth,
} from './ISaleService';
import { ISale } from '../../interfaces/sale';

interface ISaleService {
  findById: (data: string) => Promise<ISale>;
  findByCompany: (data: IFindByCompany) => Promise<ISale[]>;
  findCountByCompany: () => Promise<{
    sales_count: number;
    sales_total: number;
  }>;
  findByDay: (data: IFindByDay) => Promise<{
    sales: ISale[];
    sales_count: number;
    sales_total: number;
  }>;
  findByMonth: (data: IFindByMonth) => Promise<{
    sales: ISale[];
    sales_count: number;
    sales_total: number;
  }>;
  createSale: (data: ICreateSale) => Promise<ISale>;
  deleteSale: (data: string) => Promise<void>;
}

const service: ISaleService = {
  findById: async (data: string): Promise<ISale> => {
    const response: AxiosResponse<ISale> = await api.get(`/sale/${data}`);
    return response.data;
  },
  findByCompany: async (data: IFindByCompany): Promise<ISale[]> => {
    const response: AxiosResponse<ISale[]> = await api.get(
      `/sale?page=${data.page || 1}`,
    );
    return response.data;
  },
  findCountByCompany: async (): Promise<{
    sales_count: number;
    sales_total: number;
  }> => {
    const response: AxiosResponse<{
      sales_count: number;
      sales_total: number;
    }> = await api.get(`/sale/count`);
    return response.data;
  },
  findByDay: async (
    data: IFindByDay,
  ): Promise<{
    sales: ISale[];
    sales_count: number;
    sales_total: number;
  }> => {
    const response: AxiosResponse<{
      sales: ISale[];
      sales_count: number;
      sales_total: number;
    }> = await api.get(
      `/sale/day?year=${data.year}&month=${data.month}&day=${data.day}`,
    );
    return response.data;
  },
  findByMonth: async (
    data: IFindByMonth,
  ): Promise<{
    sales: ISale[];
    sales_count: number;
    sales_total: number;
  }> => {
    const response: AxiosResponse<{
      sales: ISale[];
      sales_count: number;
      sales_total: number;
    }> = await api.get(`/sale/month?year=${data.year}&month=${data.month}`);
    return response.data;
  },
  createSale: async (data: ICreateSale): Promise<ISale> => {
    const response: AxiosResponse<ISale> = await api.post('/sale', data);
    return response.data;
  },

  deleteSale: async (data: string): Promise<void> => {
    const response: AxiosResponse<void> = await api.delete(`/sale/${data}`);
    return response.data;
  },
};

export const saleService: ISaleService = service;
