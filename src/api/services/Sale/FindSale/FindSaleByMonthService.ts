import { inject, injectable } from 'tsyringe';
import { ISaleRepository } from '@repositories/SaleRepository/ISaleRepository';
import { Sale } from '@entities/Sale/Sale';
import { IFindResumeMonth } from './IFindSaleServiceDTO';

@injectable()
class FindSaleByMonthService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository,
  ) {}

  async execute({ reqUser, year, month }: IFindResumeMonth): Promise<{
    sales: Sale[];
    sales_count: number;
    sales_total: number;
  }> {
    const [sales, summary] = await Promise.all([
      this.saleRepository.findSalesByMonth(reqUser.id, year, month),
      this.saleRepository.findSalesSummaryForMonth(reqUser.id, year, month),
    ]);

    const result = {
      sales,
      ...summary,
    };

    return result;
  }
}

export { FindSaleByMonthService };
