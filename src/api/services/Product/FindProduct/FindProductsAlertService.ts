import { inject, injectable } from 'tsyringe';
import { Product } from '@entities/Product/Product';
import { IProductRepository } from '@repositories/ProductRepository/IProductRepository';
import { AppError } from '@utils/AppError';

@injectable()
class FindProductsAlertService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(): Promise<{
    products: Product[];
    count: number;
  }> {
    const alert =
      await this.productRepository.findProductsAndCountByStockAlert();

    if (!alert) {
      throw new AppError('Produtos não encontrado.', 404);
    }

    return alert;
  }
}

export { FindProductsAlertService };
