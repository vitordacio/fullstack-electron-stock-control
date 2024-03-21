export interface IFindByCompany {
  page?: number;
}

export interface IFindByDay {
  year: number;
  month: number;
  day: number;
}

export interface IFindByMonth {
  year: number;
  month: number;
}

export interface ICreateSale {
  stock_movements: {
    product_id: string;
    store_out: number;
    price: number;
  }[];
  cash: number;
  pix: number;
  debit: number;
  credit: number;
  discount: number;
  change: number;
  received: number;
  subtotal: number;
  total: number;
}
