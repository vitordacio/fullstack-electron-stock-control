export interface IFindProductByIdDTO {
  product_id: string;
  reqUser: AuthorizedUser<CompanyPerm>;
}

export interface IFindProductByCompanyDTO {
  reqUser: AuthorizedUser<CompanyPerm>;
  situation: string;
  category_id?: string;
  name?: string;
  page?: number;
  limit?: number;
}

export interface IFindProductAlertDTO {
  reqUser: AuthorizedUser<CompanyPerm>;
  situation: string;
}

export interface ISearchProductByNameDTO {
  reqUser: AuthorizedUser<CompanyPerm | UserPerm>;
  name?: string;
  page?: number;
  limit?: number;
}
