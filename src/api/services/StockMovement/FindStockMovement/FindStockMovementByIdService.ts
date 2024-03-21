import { inject, injectable } from 'tsyringe';
import { StockMovement } from '@entities/StockMovement/StockMovement';
import { IStockMovementRepository } from '@repositories/StockMovementRepository/IStockMovementRepository';
import { AppError } from '@utils/AppError';
import { IFindStockMovementByIdDTO } from './IFindStockMovementServiceDTO';

@injectable()
class FindStockMovementByIdService {
  constructor(
    @inject('StockMovementRepository')
    private stockMovementRepository: IStockMovementRepository,
  ) {}

  async execute({
    stock_movement_id,
    reqUser,
  }: IFindStockMovementByIdDTO): Promise<StockMovement> {
    const stock_movement = await this.stockMovementRepository.findById(
      stock_movement_id,
    );

    if (!stock_movement) {
      throw new AppError('Movimentação não encontrada.', 404);
    }

    if (stock_movement.product.company_id !== reqUser.id) {
      throw new AppError('Movimentação não pertence a essa empresa.', 400);
    }

    return stock_movement;
  }
}

export { FindStockMovementByIdService };
