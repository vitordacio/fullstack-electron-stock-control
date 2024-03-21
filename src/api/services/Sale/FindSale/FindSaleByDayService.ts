import { inject, injectable } from 'tsyringe';
import { ISaleRepository } from '@repositories/SaleRepository/ISaleRepository';
import { Sale } from '@entities/Sale/Sale';
import { IFindResumeDay } from './IFindSaleServiceDTO';

@injectable()
class FindSaleByDayService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository,
  ) {}

  async execute({ reqUser, year, month, day }: IFindResumeDay): Promise<{
    sales: Sale[];
    sales_count: number;
    sales_total: number;
  }> {
    const [sales, summary] = await Promise.all([
      this.saleRepository.findSalesByDay(reqUser.id, year, month, day),
      this.saleRepository.findSalesSummaryForDay(reqUser.id, year, month, day),
    ]);

    const result = {
      sales,
      ...summary,
    };

    return result;
  }
}

export { FindSaleByDayService };
