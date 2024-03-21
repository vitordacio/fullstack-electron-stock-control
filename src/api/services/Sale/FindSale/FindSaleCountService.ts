import { inject, injectable } from 'tsyringe';
import { ISaleRepository } from '@repositories/SaleRepository/ISaleRepository';

@injectable()
class FindSaleCountService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository,
  ) {}

  async execute(
    reqUser: AuthorizedUser<CompanyPerm>,
  ): Promise<{ sales_count: number; sales_total: number }> {
    const result = await this.saleRepository.countTotal(reqUser.id);

    return result;
  }
}

export { FindSaleCountService };
