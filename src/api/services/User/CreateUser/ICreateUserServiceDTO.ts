export interface ICreateUserDTO {
  name: string;
  username: string;
  email: string;
  role_name: string;
  actived: boolean;
  reqUser: AuthorizedUser<CompanyPerm>;
}
