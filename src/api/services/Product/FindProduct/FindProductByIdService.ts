import { inject, injectable } from 'tsyringe';
import { Product } from '@entities/Product/Product';
import { IProductRepository } from '@repositories/ProductRepository/IProductRepository';
import { AppError } from '@utils/AppError';
import { IFindProductByIdDTO } from './IFindProductServiceDTO';

@injectable()
class FindProductByIdService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({
    product_id,
    reqUser,
  }: IFindProductByIdDTO): Promise<Product> {
    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new AppError('Produto não encontrado.', 404);
    }

    if (product.company_id !== reqUser.id) {
      throw new AppError('Produto não pertence a essa empresa.', 400);
    }

    return product;
  }
}

export { FindProductByIdService };
