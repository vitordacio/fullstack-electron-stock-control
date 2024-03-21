export interface IUser {
  id_user: string;
  username: string;
  email: string;
  name: string;
  role_name: string;
  actived: boolean;
  created_at: Date;
  deleted_at: Date;
  sales_count: number;
  sales_total: number;
}
