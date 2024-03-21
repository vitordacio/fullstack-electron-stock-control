import { IStockMovement } from './stockMovement';
import { IUser } from './user';

export interface ISale {
  id_sale: string;
  company_id: string;
  company: IUser;
  author_id: string;
  author: IUser;
  stock_movements: IStockMovement[];
  cash: number;
  pix: number;
  debit: number;
  credit: number;
  discount: number;
  change: number;
  received: number;
  subtotal: number;
  total: number;
  created_at: Date;
}
