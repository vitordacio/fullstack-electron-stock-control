import api from '../../config/api';
import { AxiosResponse } from 'axios';
import { ICreateStockMovement, IFindByCompany } from './IStockMovementService';
import { IStockMovement } from '../../interfaces/stockMovement';

interface IStockMovementService {
  findById: (data: string) => Promise<IStockMovement>;
  findByCompany: (data: IFindByCompany) => Promise<IStockMovement[]>;
  findCountByCompany: () => Promise<number>;
  createStockMovement: (data: ICreateStockMovement) => Promise<IStockMovement>;
  deleteStockMovement: (data: string) => Promise<void>;
}

const service: IStockMovementService = {
  findById: async (data: string): Promise<IStockMovement> => {
    const response: AxiosResponse<IStockMovement> = await api.get(
      `/stock/${data}`,
    );
    return response.data;
  },

  findByCompany: async (data: IFindByCompany): Promise<IStockMovement[]> => {
    const response: AxiosResponse<IStockMovement[]> = await api.get(
      `/stock?product_id${data.product_id ? `=${data.product_id}` : ''}&page=${
        data.page || 1
      }`,
    );
    return response.data;
  },
  findCountByCompany: async (): Promise<number> => {
    const response: AxiosResponse<number> = await api.get(`/stock/count`);
    return response.data;
  },
  createStockMovement: async (
    data: ICreateStockMovement,
  ): Promise<IStockMovement> => {
    const response: AxiosResponse<IStockMovement> = await api.post(
      '/stock',
      data,
    );
    return response.data;
  },
  deleteStockMovement: async (data: string): Promise<void> => {
    const response: AxiosResponse<void> = await api.delete(`/stock/${data}`);
    return response.data;
  },
};

export const stockMovementService: IStockMovementService = service;
