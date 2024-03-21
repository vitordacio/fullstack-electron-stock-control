import { ICategory } from './category';
import { IStockMovement } from './stockMovement';

export interface IProduct {
  id_product: string;
  category_id: string;
  category: ICategory;
  name: string;
  code: string;
  price: number;
  price_cost: number;
  stock_local_qtd: number;
  stock_local_min: number;
  stock_local_max: number;
  stock_store_qtd: number;
  stock_store_min: number;
  stock_store_max: number;
  actived: boolean;
  created_at: Date;
  deleted_at: Date;
  stock_movements: IStockMovement[];
}
