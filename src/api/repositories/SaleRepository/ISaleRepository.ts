import { ISale } from '@entities/Sale/ISale';
import { Sale } from '@entities/Sale/Sale';

export interface ISaleRepository {
  create(data: ISale): Sale;
  save(entitie: Sale): Promise<Sale>;
  saveMany(entities: Sale[]): Promise<Sale[]>;
  findById(id: string): Promise<Sale | undefined>;
  countTotal(
    company_id: string,
  ): Promise<{ sales_count: number; sales_total: number }>;
  findLatestByCompany(
    company_id: string,
    page: number,
    limit: number,
  ): Promise<Sale[]>;
  findSalesByAuthorId(
    author_id: string,
  ): Promise<{ sales_count: number; sales_total: number }>;
  findSalesSummaryForDay(
    company_id: string,
    year: number,
    month: number,
    day: number,
  ): Promise<{ sales_count: number; sales_total: number }>;
  findSalesByDay(
    company_id: string,
    year: number,
    month: number,
    day: number,
  ): Promise<Sale[]>;
  findSalesSummaryForMonth(
    company_id: string,
    year: number,
    month: number,
  ): Promise<{ sales_count: number; sales_total: number }>;
  findSalesByMonth(
    company_id: string,
    year: number,
    month: number,
  ): Promise<Sale[]>;
  remove(entitie: Sale): Promise<void>;
}
