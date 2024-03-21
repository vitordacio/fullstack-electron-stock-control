import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { FindStockMovementByIdService } from '@services/StockMovement/FindStockMovement/FindStockMovementByIdService';

class FindStockMovementByIdController {
  private findStockMovementByIdService: FindStockMovementByIdService;

  constructor() {
    this.findStockMovementByIdService = container.resolve(
      FindStockMovementByIdService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { stock_movement_id } = req.params;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const stockMovimentInstance =
      await this.findStockMovementByIdService.execute({
        stock_movement_id,
        reqUser: req.user,
      });

    return res.status(201).json(instanceToPlain(stockMovimentInstance));
  }
}

export { FindStockMovementByIdController };
