import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { companyPerm } from '@config/constants';
import { CreateStockMovementService } from '@services/StockMovement/CreateStockMovement/CreateStockMovementService';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';

class CreateStockMovementController {
  private createStockMovementService: CreateStockMovementService;

  constructor() {
    this.createStockMovementService = container.resolve(
      CreateStockMovementService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { product_id, price, local_in, local_out, store_in, store_out } =
      req.body;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const stockMovimentInstance = await this.createStockMovementService.execute(
      {
        product_id,
        price,
        local_in,
        local_out,
        store_in,
        store_out,
        reqUser: req.user,
      },
    );

    return res.status(201).json(instanceToPlain(stockMovimentInstance));
  }
}

export { CreateStockMovementController };
