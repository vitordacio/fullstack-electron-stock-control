import { inject, injectable } from 'tsyringe';
import { Sale } from '@entities/Sale/Sale';
import { ISaleRepository } from '@repositories/SaleRepository/ISaleRepository';
import { IFindSaleByCompanyDTO } from './IFindSaleServiceDTO';

@injectable()
class FindSaleByCompanyService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository,
  ) {}

  async execute({
    page,
    limit,
    reqUser,
  }: IFindSaleByCompanyDTO): Promise<Sale[]> {
    const currentPage = page || 1;
    const currentLimit = limit || 20;

    const sales = await this.saleRepository.findLatestByCompany(
      reqUser.id,
      currentPage,
      currentLimit,
    );

    return sales;
  }
}

export { FindSaleByCompanyService };
