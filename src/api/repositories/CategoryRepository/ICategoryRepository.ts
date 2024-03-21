import { ICategory } from '@entities/Category/ICategory';
import { Category } from '@entities/Category/Category';

export type FindCategoryByCompany = {
  company_id: string;
  name?: string;
  page: number;
  limit: number;
};

export interface ICategoryRepository {
  create(data: ICategory): Category;
  save(entitie: Category): Promise<Category>;
  saveMany(entities: Category[]): Promise<Category[]>;
  findById(id: string): Promise<Category | undefined>;
  findByCompany(data: FindCategoryByCompany): Promise<Category[]>;
  findIndexByCompany(company_id: string): Promise<Category[]>;
  countTotal(company_id: string): Promise<number>;
  remove(entitie: Category): Promise<void>;
}
