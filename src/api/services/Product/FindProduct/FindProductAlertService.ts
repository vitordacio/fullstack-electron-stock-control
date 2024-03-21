import { inject, injectable } from 'tsyringe';
import { Product } from '@entities/Product/Product';
import { IProductRepository } from '@repositories/ProductRepository/IProductRepository';
import { IFindProductAlertDTO } from './IFindProductServiceDTO';

type FindAlertResponse = {
  products: Product[];
  count: number;
};

@injectable()
class FindProductAlertService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({
    situation,
    reqUser,
  }: IFindProductAlertDTO): Promise<FindAlertResponse> {
    let result: FindAlertResponse = { products: [], count: 0 };

    if (!situation) {
      result = await this.productRepository.findProductsAndCountByStockAlert(
        reqUser.id,
      );
    }

    if (situation === 'local') {
      result =
        await this.productRepository.findProductsAndCountByStockLocalAlert(
          reqUser.id,
        );
    }

    if (situation === 'store') {
      result =
        await this.productRepository.findProductsAndCountByStockStoreAlert(
          reqUser.id,
        );
    }

    return result as FindAlertResponse;
  }
}

export { FindProductAlertService };
