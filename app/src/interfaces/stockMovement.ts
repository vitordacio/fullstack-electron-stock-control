import { IProduct } from './product';

export interface IStockMovement {
  id_stock_movement: string;
  product_id: string;
  product: IProduct;
  user_id: string;
  price?: number;
  local_in?: number;
  local_out?: number;
  store_in?: number;
  store_out?: number;
  created_at: Date;
  deleted_at: Date;
}
