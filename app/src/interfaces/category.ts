import { IProduct } from './product';

export interface ICategory {
  id_category: string;
  name: string;
  products: IProduct[];
  deleted_at: Date;
}
