export interface IFindByCompany {
  situation: 'latest' | 'actived_true' | 'actived_false' | 'deleted';
  name: string;
  category_id?: string;
  page?: number;
}
export interface ISearchProductByName {
  name: string;
  page?: number;
}

export interface ICreateProduct {
  name: string;
  code?: string;
  category_id?: string;
  price: number;
  price_cost?: number;
  stock_local_qtd: number;
  stock_local_min?: number;
  stock_local_max?: number;
  stock_store_qtd: number;
  stock_store_min?: number;
  stock_store_max?: number;
  actived: boolean;
}

export interface IUpdateProduct {
  product_id: string;
  name: string;
  code?: string;
  category_id?: string;
  price: number;
  price_cost?: number;
  stock_local_qtd: number;
  stock_local_min?: number;
  stock_local_max?: number;
  stock_store_qtd: number;
  stock_store_min?: number;
  stock_store_max?: number;
  actived: boolean;
}

export interface ICountByCompanyResponse {
  countTotal: number;
  countAlertLocal: number;
  countAlertStore: number;
}
