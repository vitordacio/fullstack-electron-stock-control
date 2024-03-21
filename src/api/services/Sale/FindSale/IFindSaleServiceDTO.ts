export interface IFindSaleByIdDTO {
  sale_id: string;
  reqUser: AuthorizedUser<CompanyPerm>;
}

export interface IFindSaleByCompanyDTO {
  reqUser: AuthorizedUser<CompanyPerm>;
  page?: number;
  limit?: number;
}

export interface IFindResumeDay {
  reqUser: AuthorizedUser<CompanyPerm>;
  year: number;
  month: number;
  day: number;
}

export interface IFindResumeMonth {
  reqUser: AuthorizedUser<CompanyPerm>;
  year: number;
  month: number;
}
