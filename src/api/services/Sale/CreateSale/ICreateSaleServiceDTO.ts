import { IStockMovement } from '@entities/StockMovement/IStockMovement';

export interface ICreateSaleDTO {
  cash?: number;
  pix?: number;
  debit?: number;
  credit?: number;
  discount: number;
  change: number;
  received: number;
  subtotal: number;
  total: number;
  stock_movements: IStockMovement[];
  reqUser: AuthorizedUser<CompanyPerm | UserPerm>;
}
