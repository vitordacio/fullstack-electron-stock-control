import { IProduct } from '@entities/Product/IProduct';
import { Product } from '@entities/Product/Product';

export type FindProductByCompany = {
  company_id: string;
  category_id?: string;
  name?: string;
  actived?: boolean;
  page: number;
  limit: number;
};

export interface IProductRepository {
  create(data: IProduct): Product;
  save(entitie: Product): Promise<Product>;
  saveMany(entities: Product[]): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findManyByIds(ids: string[]): Promise<Product[]>;
  searchByName(data: FindProductByCompany): Promise<Product[]>;
  findLatestByName(data: FindProductByCompany): Promise<Product[]>;
  findActivedByName(data: FindProductByCompany): Promise<Product[]>;
  findDeletedByName(data: FindProductByCompany): Promise<Product[]>;
  findProductsAndCountByStockAlert(company_id: string): Promise<{
    products: Product[];
    count: number;
  }>;
  findProductsAndCountByStockLocalAlert(company_id: string): Promise<{
    products: Product[];
    count: number;
  }>;
  findProductsAndCountByStockStoreAlert(company_id: string): Promise<{
    products: Product[];
    count: number;
  }>;
  countTotal(company_id: string): Promise<number>;
  countByCompany(company_id: string): Promise<{
    countTotal: number;
    countAlertLocal: number;
    countAlertStore: number;
  }>;
  remove(entitie: Product): Promise<void>;
}
