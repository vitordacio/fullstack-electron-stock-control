import { inject, injectable } from 'tsyringe';
import { Product } from '@entities/Product/Product';
import { IProductRepository } from '@repositories/ProductRepository/IProductRepository';
import { IFindProductByCompanyDTO } from './IFindProductServiceDTO';

@injectable()
class FindProductByCompanyService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({
    situation,
    category_id,
    name,
    page,
    limit,
    reqUser,
  }: IFindProductByCompanyDTO): Promise<Product[]> {
    const currentPage = page || 1;
    const currentLimit = limit || 20;
    let products: Product[] = [];

    if (situation === 'latest') {
      products = await this.productRepository.findLatestByName({
        company_id: reqUser.id,
        name,
        category_id,
        page: currentPage,
        limit: currentLimit,
      });
    }

    if (situation === 'actived_true') {
      products = await this.productRepository.findActivedByName({
        company_id: reqUser.id,
        name,
        actived: true,
        category_id,
        page: currentPage,
        limit: currentLimit,
      });
    }

    if (situation === 'actived_false') {
      products = await this.productRepository.findActivedByName({
        company_id: reqUser.id,
        name,
        actived: false,
        category_id,
        page: currentPage,
        limit: currentLimit,
      });
    }

    if (situation === 'deleted') {
      products = await this.productRepository.findDeletedByName({
        company_id: reqUser.id,
        name,
        category_id,
        page: currentPage,
        limit: currentLimit,
      });
    }

    return products;
  }
}

export { FindProductByCompanyService };
