export interface IStockMovement {
  id: string;
  product_id: string;
  user_id: string;
  sale_id?: string;
  price?: number;
  local_in?: number;
  local_out?: number;
  store_in?: number;
  store_out?: number;
}
