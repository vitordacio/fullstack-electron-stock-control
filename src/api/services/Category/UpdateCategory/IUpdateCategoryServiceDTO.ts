export interface IUpdateCategoryDTO {
  category_id: string;
  name: string;
  reqUser: AuthorizedUser<CompanyPerm>;
}
