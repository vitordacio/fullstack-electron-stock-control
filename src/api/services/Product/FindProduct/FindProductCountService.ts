import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@repositories/ProductRepository/IProductRepository';

@injectable()
class FindProductCountService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(reqUser: AuthorizedUser<CompanyPerm>): Promise<{
    countTotal: number;
    countAlertLocal: number;
    countAlertStore: number;
  }> {
    const result = await this.productRepository.countByCompany(reqUser.id);

    return result;
  }
}

export { FindProductCountService };
