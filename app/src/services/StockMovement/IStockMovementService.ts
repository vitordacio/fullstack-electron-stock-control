export interface ICreateStockMovement {
  product_id: string;
  price?: number;
  local_in?: number;
  local_out?: number;
  store_in?: number;
  store_out?: number;
}

export interface IFindByCompany {
  product_id: string;
  page?: number;
}
