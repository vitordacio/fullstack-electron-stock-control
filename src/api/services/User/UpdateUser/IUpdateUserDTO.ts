export interface IUpdateUserDTO {
  user_id: string;
  name: string;
  email: string;
  username: string;
  actived: boolean;
  reqUser: AuthorizedUser<UserPerm | CompanyPerm>;
}

export interface IUpdatePasswordDTO {
  user_id: string;
  password?: string;
  new_password: string;
  reqUser: AuthorizedUser<UserPerm | CompanyPerm>;
}
