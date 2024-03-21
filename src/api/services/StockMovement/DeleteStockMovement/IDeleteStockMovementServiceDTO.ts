export interface IDeleteStockMovementDTO {
  stock_movement_id: string;
  reqUser: AuthorizedUser<CompanyPerm>;
}
