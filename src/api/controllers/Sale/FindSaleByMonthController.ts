import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { FindSaleByMonthService } from '@services/Sale/FindSale/FindSaleByMonthService';

class FindSaleByMonthController {
  private findSaleByMonthService: FindSaleByMonthService;

  constructor() {
    this.findSaleByMonthService = container.resolve(FindSaleByMonthService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { year, month } = req.query;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const saleInstance = await this.findSaleByMonthService.execute({
      reqUser: req.user,
      year: parseInt(year as string, 10),
      month: parseInt(month as string, 10),
    });

    return res.status(201).json(instanceToPlain(saleInstance));
  }
}

export { FindSaleByMonthController };
