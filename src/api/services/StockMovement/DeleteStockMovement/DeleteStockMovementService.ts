import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IStockMovementRepository } from '@repositories/StockMovementRepository/IStockMovementRepository';
import { IProductRepository } from '@repositories/ProductRepository/IProductRepository';
import { IDeleteStockMovementDTO } from './IDeleteStockMovementServiceDTO';

@injectable()
class DeleteStockMovementService {
  constructor(
    @inject('StockMovementRepository')
    private stockMovementRepository: IStockMovementRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({
    stock_movement_id,
    reqUser,
  }: IDeleteStockMovementDTO): Promise<void> {
    const stock_movement = await this.stockMovementRepository.findById(
      stock_movement_id,
    );

    if (!stock_movement) {
      throw new AppError('Movimentação não encontrada.', 404);
    }

    if (stock_movement.product.company_id !== reqUser.id) {
      throw new AppError('Movimentação não pertence a essa empresa.', 400);
    }

    if (stock_movement.local_in)
      stock_movement.product.stock_local_qtd =
        Number(stock_movement.product.stock_local_qtd) +
        stock_movement.local_in * -1;
    if (stock_movement.local_out)
      stock_movement.product.stock_local_qtd =
        Number(stock_movement.product.stock_local_qtd) -
        stock_movement.local_out * -1;

    if (stock_movement.store_in)
      stock_movement.product.stock_store_qtd =
        Number(stock_movement.product.stock_store_qtd) +
        stock_movement.store_in * -1;
    if (stock_movement.store_out)
      stock_movement.product.stock_store_qtd =
        Number(stock_movement.product.stock_store_qtd) -
        stock_movement.store_out * -1;

    await this.productRepository.save(stock_movement.product);

    await this.stockMovementRepository.remove(stock_movement);
  }
}

export { DeleteStockMovementService };
