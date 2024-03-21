import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { DeleteStockMovementService } from '@services/StockMovement/DeleteStockMovement/DeleteStockMovementService';

class DeleteStockMovementController {
  private deleteStockMovementService: DeleteStockMovementService;

  constructor() {
    this.deleteStockMovementService = container.resolve(
      DeleteStockMovementService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { stock_movement_id } = req.params;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const stockMovimentInstance = await this.deleteStockMovementService.execute(
      {
        stock_movement_id,
        reqUser: req.user,
      },
    );

    return res.status(201).json(instanceToPlain(stockMovimentInstance));
  }
}

export { DeleteStockMovementController };
