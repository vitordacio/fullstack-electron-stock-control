import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { FindSaleByCompanyService } from '@services/Sale/FindSale/FindSaleByCompanyService';

class FindSaleByCompanyController {
  private findSaleByCompanyService: FindSaleByCompanyService;

  constructor() {
    this.findSaleByCompanyService = container.resolve(FindSaleByCompanyService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const saleInstance = await this.findSaleByCompanyService.execute({
      reqUser: req.user,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
    });

    return res.status(201).json(instanceToPlain(saleInstance));
  }
}

export { FindSaleByCompanyController };
