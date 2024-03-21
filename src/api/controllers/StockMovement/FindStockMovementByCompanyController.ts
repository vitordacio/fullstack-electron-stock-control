import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { FindStockMovementByCompanyService } from '@services/StockMovement/FindStockMovement/FindStockMovementByCompanyService';

class FindStockMovementByCompanyController {
  private findStockMovimentsService: FindStockMovementByCompanyService;

  constructor() {
    this.findStockMovimentsService = container.resolve(
      FindStockMovementByCompanyService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { product_id, page, limit } = req.query;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const stockMovimentInstance = await this.findStockMovimentsService.execute({
      product_id: product_id as string,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
    });

    return res.status(201).json(instanceToPlain(stockMovimentInstance));
  }
}

export { FindStockMovementByCompanyController };
