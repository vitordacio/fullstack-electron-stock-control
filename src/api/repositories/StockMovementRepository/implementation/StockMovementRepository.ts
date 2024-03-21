import { getRepository, Repository } from 'typeorm';
import { IStockMovement } from '@entities/StockMovement/IStockMovement';
import { StockMovement } from '@entities/StockMovement/StockMovement';
import { IStockMovementRepository } from '../IStockMovementRepository';

class StockMovementRepository implements IStockMovementRepository {
  private ormRepository: Repository<StockMovement>;

  constructor() {
    this.ormRepository = getRepository(StockMovement);
  }

  create(data: IStockMovement): StockMovement {
    const category = this.ormRepository.create({
      id_stock_movement: data.id,
      user_id: data.user_id,
      product_id: data.product_id,
      sale_id: data.sale_id,
      price: data.price,
      local_in: data.local_in,
      local_out: data.local_out,
      store_in: data.store_in,
      store_out: data.store_out,
    });

    return category;
  }

  async save(entitie: StockMovement): Promise<StockMovement> {
    const newStockMovement = await this.ormRepository.save(entitie);

    return newStockMovement;
  }

  async saveMany(entities: StockMovement[]): Promise<StockMovement[]> {
    const newStockMovements = await this.ormRepository.save(entities);

    return newStockMovements;
  }

  async findById(id: string): Promise<StockMovement | undefined> {
    const category = await this.ormRepository.findOne({
      relations: ['user', 'product'],
      where: { id_stock_movement: id },
    });

    return category;
  }

  async findByProductId(
    product_id: string,
    page: number,
    limit: number,
  ): Promise<StockMovement[]> {
    const category = await this.ormRepository.find({
      relations: ['user', 'product'],
      where: { product_id },
      take: limit,
      skip: (page - 1) * limit,
      order: { created_at: 'DESC' },
    });

    return category;
  }

  async remove(entitie: StockMovement): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { StockMovementRepository };
