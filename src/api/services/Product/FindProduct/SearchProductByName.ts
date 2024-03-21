import { inject, injectable } from 'tsyringe';
import { Product } from '@entities/Product/Product';
import { IProductRepository } from '@repositories/ProductRepository/IProductRepository';
import { AppError } from '@utils/AppError';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { ISearchProductByNameDTO } from './IFindProductServiceDTO';

@injectable()
class SearchProductByNameService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    name,
    page,
    limit,
    reqUser,
  }: ISearchProductByNameDTO): Promise<Product[]> {
    const currentPage = page || 1;
    const currentLimit = limit || 20;
    let company_id;

    if (reqUser.role === 'user') {
      const user = await this.userRepository.findById(reqUser.id);

      if (!user || !user.employee) {
        throw new AppError('Operação não permitida', 403);
      }

      company_id = user.employee.company_id;
    } else {
      company_id = reqUser.id;
    }

    const products = await this.productRepository.searchByName({
      company_id,
      name,
      page: currentPage,
      limit: currentLimit,
    });

    return products;
  }
}

export { SearchProductByNameService };
