export interface ICreateStockMovementDTO {
  product_id: string;
  price?: number;
  local_in?: number;
  local_out?: number;
  store_in?: number;
  store_out?: number;
  reqUser: AuthorizedUser<CompanyPerm>;
}
