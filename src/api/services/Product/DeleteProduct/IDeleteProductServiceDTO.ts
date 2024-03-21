export interface IDeleteProductDTO {
  product_id: string;
  reqUser: AuthorizedUser<CompanyPerm>;
}
