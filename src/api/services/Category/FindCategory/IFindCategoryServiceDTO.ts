export interface IFindCategoryByIdDTO {
  category_id: string;
  reqUser: AuthorizedUser<CompanyPerm>;
}

export interface IFindCategoryByCompanyDTO {
  name: string;
  page?: number;
  limit?: number;
  reqUser: AuthorizedUser<CompanyPerm>;
}
