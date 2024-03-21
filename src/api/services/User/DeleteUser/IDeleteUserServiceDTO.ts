export interface IDeleteUserDTO {
  user_id: string;
  reqUser: AuthorizedUser<CompanyPerm>;
}
