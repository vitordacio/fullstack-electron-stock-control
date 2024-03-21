import { inject, injectable } from 'tsyringe';

import { AppError } from '@utils/AppError';
import { IProductRepository } from '@repositories/ProductRepository/IProductRepository';
import { IDeleteProductDTO } from './IDeleteProductServiceDTO';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({ product_id, reqUser }: IDeleteProductDTO): Promise<void> {
    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new AppError('Produto não encontrado.', 404);
    }

    if (product.company_id !== reqUser.id) {
      throw new AppError('Produto não pertence a essa empresa.', 400);
    }

    await this.productRepository.remove(product);
  }
}

export { DeleteProductService };
