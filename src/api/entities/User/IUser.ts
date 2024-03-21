export interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  actived: boolean;
  role_name?: string;
  tags: string[];
}
