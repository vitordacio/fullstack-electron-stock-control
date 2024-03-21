import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { IStockMovementRepository } from '@repositories/StockMovementRepository/IStockMovementRepository';
import { StockMovement } from '@entities/StockMovement/StockMovement';
import { IProductRepository } from '@repositories/ProductRepository/IProductRepository';
import { AppError } from '@utils/AppError';
import { ICreateStockMovementDTO } from './ICreateStockMovementServiceDTO';

@injectable()
class CreateStockMovementService {
  constructor(
    @inject('StockMovementRepository')
    private stockMovementRepository: IStockMovementRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({
    product_id,
    price,
    local_in,
    local_out,
    store_in,
    store_out,
    reqUser,
  }: ICreateStockMovementDTO): Promise<StockMovement> {
    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    const stock_movement = this.stockMovementRepository.create({
      id: v4(),
      user_id: reqUser.id,
      product_id: product.id_product,
      price,
      local_in,
      local_out,
      store_in,
      store_out,
    });

    await this.stockMovementRepository.save(stock_movement);

    if (local_in)
      product.stock_local_qtd = Number(product.stock_local_qtd) + local_in;
    if (local_out)
      product.stock_local_qtd = Number(product.stock_local_qtd) - local_out;

    if (store_in)
      product.stock_store_qtd = Number(product.stock_store_qtd) + store_in;
    if (store_out)
      product.stock_store_qtd = Number(product.stock_store_qtd) - store_out;

    await this.productRepository.save(product);

    return stock_movement;
  }
}

export { CreateStockMovementService };
