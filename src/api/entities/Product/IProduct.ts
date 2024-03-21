export interface IProduct {
  id: string;
  category_id?: string;
  company_id: string;
  name: string;
  code?: string;
  price: number;
  price_cost?: number;
  stock_local_qtd: number;
  stock_local_min?: number;
  stock_local_max?: number;
  stock_store_qtd: number;
  stock_store_min?: number;
  stock_store_max?: number;
  actived: boolean;
  tags: string[];
}
