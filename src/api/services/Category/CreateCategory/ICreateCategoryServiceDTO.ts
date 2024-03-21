export interface ICreateCategoryDTO {
  name: string;
  reqUser: AuthorizedUser<CompanyPerm>;
}
