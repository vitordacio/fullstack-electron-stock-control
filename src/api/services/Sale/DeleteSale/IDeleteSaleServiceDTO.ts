export interface IDeleteSaleDTO {
  sale_id: string;
  reqUser: AuthorizedUser<CompanyPerm>;
}
