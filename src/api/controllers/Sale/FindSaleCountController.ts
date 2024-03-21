import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { FindSaleCountService } from '@services/Sale/FindSale/FindSaleCountService';

class FindSaleCountController {
  private findSaleCountService: FindSaleCountService;

  constructor() {
    this.findSaleCountService = container.resolve(FindSaleCountService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const saleInstance = await this.findSaleCountService.execute(req.user);

    return res.status(201).json(instanceToPlain(saleInstance));
  }
}

export { FindSaleCountController };
