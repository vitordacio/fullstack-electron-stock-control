import { IStockMovement } from '@entities/StockMovement/IStockMovement';
import { StockMovement } from '@entities/StockMovement/StockMovement';

export interface IStockMovementRepository {
  create(data: IStockMovement): StockMovement;
  save(entitie: StockMovement): Promise<StockMovement>;
  saveMany(entities: StockMovement[]): Promise<StockMovement[]>;
  findById(id: string): Promise<StockMovement | undefined>;
  findByProductId(
    product_id: string,
    page: number,
    limit: number,
  ): Promise<StockMovement[]>;
  remove(entitie: StockMovement): Promise<void>;
}
