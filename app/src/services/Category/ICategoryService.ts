export interface ICreateCategory {
  name: string;
}
export interface IUpdateCategory {
  category_id: string;
  name: string;
}

export interface IFindByCompany {
  name: string;
  page?: number;
}
