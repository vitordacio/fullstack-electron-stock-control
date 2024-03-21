import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { FindSaleByDayService } from '@services/Sale/FindSale/FindSaleByDayService';

class FindSaleByDayController {
  private findSaleByDayService: FindSaleByDayService;

  constructor() {
    this.findSaleByDayService = container.resolve(FindSaleByDayService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { year, month, day } = req.query;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const saleInstance = await this.findSaleByDayService.execute({
      reqUser: req.user,
      year: parseInt(year as string, 10),
      month: parseInt(month as string, 10),
      day: parseInt(day as string, 10),
    });

    return res.status(201).json(instanceToPlain(saleInstance));
  }
}

export { FindSaleByDayController };
