export interface IFindStockMovementByIdDTO {
  stock_movement_id: string;
  reqUser: AuthorizedUser<CompanyPerm>;
}

export interface IFindStockMovementByCompanyDTO {
  product_id: string;
  page?: number;
  limit?: number;
}
