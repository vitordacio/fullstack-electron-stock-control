export interface IFindUserByIdDTO {
  user_id: string;
  reqUser: AuthorizedUser<CompanyPerm>;
}

export interface IFindUserByCompanyDTO {
  reqUser: AuthorizedUser<CompanyPerm>;
  situation: string;
  name?: string;
  page?: number;
  limit?: number;
}
