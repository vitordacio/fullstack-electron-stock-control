import { getRepository, Repository } from 'typeorm';
import { ISale } from '@entities/Sale/ISale';
import { Sale } from '@entities/Sale/Sale';
import { ISaleRepository } from '../ISaleRepository';

class SaleRepository implements ISaleRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  create(data: ISale): Sale {
    const sale = this.ormRepository.create({
      id_sale: data.id,
      company_id: data.company_id,
      author_id: data.author_id,
      cash: data.cash,
      pix: data.pix,
      debit: data.debit,
      credit: data.credit,
      discount: data.discount,
      change: data.change,
      received: data.received,
      subtotal: data.subtotal,
      total: data.total,
    });

    return sale;
  }

  async save(entitie: Sale): Promise<Sale> {
    const newSale = await this.ormRepository.save(entitie);

    return newSale;
  }

  async saveMany(entities: Sale[]): Promise<Sale[]> {
    const newSales = await this.ormRepository.save(entities);

    return newSales;
  }

  async findById(id: string): Promise<Sale | undefined> {
    const sale = await this.ormRepository.findOne({
      relations: [
        'company',
        'author',
        'stock_movements',
        'stock_movements.product',
      ],
      where: { id_sale: id },
    });
    return sale;
  }

  async findLatestByCompany(
    company_id: string,
    page: number,
    limit: number,
  ): Promise<Sale[]> {
    const sales = await this.ormRepository.find({
      relations: ['author'],
      where: { company_id },
      take: limit,
      skip: (page - 1) * limit,
      order: { created_at: 'DESC' },
    });

    return sales;
  }

  async countTotal(
    company_id: string,
  ): Promise<{ sales_count: number; sales_total: number }> {
    const result = await this.ormRepository
      .createQueryBuilder('sale')
      .select([
        'COUNT(sale.id_sale) as sales_count',
        'SUM(sale.total) as sales_total',
      ])
      .where({
        company_id,
      })
      .getRawOne();

    return result;
  }

  async findSalesByAuthorId(
    author_id: string,
  ): Promise<{ sales_count: number; sales_total: number }> {
    const result = await this.ormRepository
      .createQueryBuilder('sale')
      .select([
        'COUNT(sale.id_sale) as sales_count',
        'SUM(sale.total) as sales_total',
      ])
      .where({
        author_id,
      })
      .getRawOne();

    return result;
  }

  async findSalesSummaryForDay(
    company_id: string,
    year: number,
    month: number,
    day: number,
  ): Promise<{ sales_count: number; sales_total: number }> {
    const result = await this.ormRepository
      .createQueryBuilder('sale')
      .select([
        'COUNT(sale.id_sale) as sales_count',
        'SUM(sale.total) as sales_total',
      ])
      .where({
        company_id,
      })
      .andWhere(
        'EXTRACT(YEAR FROM sale.created_at) = :year AND EXTRACT(MONTH FROM sale.created_at) = :month AND EXTRACT(DAY FROM sale.created_at) = :day',
        {
          year,
          month,
          day,
        },
      )
      .getRawOne();

    return result;
  }

  async findSalesByDay(
    company_id: string,
    year: number,
    month: number,
    day: number,
  ): Promise<Sale[]> {
    const result = await this.ormRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.author', 'author')
      // .select(['sale.id_sale', 'sale.total', 'sale.created_at'])
      .where({
        company_id,
      })
      .andWhere(
        'EXTRACT(YEAR FROM sale.created_at) = :year AND EXTRACT(MONTH FROM sale.created_at) = :month AND EXTRACT(DAY FROM sale.created_at) = :day',
        {
          year,
          month,
          day,
        },
      )
      .orderBy('sale.created_at, sale.updated_at', 'ASC')
      .getMany();

    return result;
  }

  async findSalesSummaryForMonth(
    company_id: string,
    year: number,
    month: number,
  ): Promise<{ sales_count: number; sales_total: number }> {
    const result = await this.ormRepository
      .createQueryBuilder('sale')
      .select([
        'COUNT(sale.id_sale) as sales_count',
        'SUM(sale.total) as sales_total',
      ])
      .where({
        company_id,
      })
      .andWhere(
        'EXTRACT(YEAR FROM sale.created_at) = :year AND EXTRACT(MONTH FROM sale.created_at) = :month',
        {
          year,
          month,
        },
      )
      .getRawOne();

    return result;
  }

  async findSalesByMonth(
    company_id: string,
    year: number,
    month: number,
  ): Promise<Sale[]> {
    const result = await this.ormRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.author', 'author')
      // .select(['sale.id_sale', 'sale.total', 'sale.created_at'])
      .where({
        company_id,
      })
      .andWhere(
        'EXTRACT(YEAR FROM sale.created_at) = :year AND EXTRACT(MONTH FROM sale.created_at) = :month',
        {
          year,
          month,
        },
      )
      .orderBy('sale.created_at, sale.updated_at', 'ASC')
      .getMany();

    return result;
  }

  async remove(entitie: Sale): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { SaleRepository };
