import { inject, injectable } from 'tsyringe';
import { StockMovement } from '@entities/StockMovement/StockMovement';
import { IStockMovementRepository } from '@repositories/StockMovementRepository/IStockMovementRepository';
import { IFindStockMovementByCompanyDTO } from './IFindStockMovementServiceDTO';

@injectable()
class FindStockMovementByCompanyService {
  constructor(
    @inject('StockMovementRepository')
    private stockMovementRepository: IStockMovementRepository,
  ) {}

  async execute({
    product_id,
    page,
    limit,
  }: IFindStockMovementByCompanyDTO): Promise<StockMovement[]> {
    const currentPage = page || 1;
    const currentLimit = limit || 20;

    const stock_movements = await this.stockMovementRepository.findByProductId(
      product_id,
      currentPage,
      currentLimit,
    );

    return stock_movements;
  }
}

export { FindStockMovementByCompanyService };
