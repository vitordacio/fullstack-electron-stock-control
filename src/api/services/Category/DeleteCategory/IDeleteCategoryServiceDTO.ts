export interface IDeleteCategoryDTO {
  category_id: string;
  reqUser: AuthorizedUser<CompanyPerm>;
}
