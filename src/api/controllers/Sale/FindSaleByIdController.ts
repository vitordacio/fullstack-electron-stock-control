import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { FindSaleByIdService } from '@services/Sale/FindSale/FindSaleByIdService';

class FindSaleByIdController {
  private findSaleByIdService: FindSaleByIdService;

  constructor() {
    this.findSaleByIdService = container.resolve(FindSaleByIdService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { sale_id } = req.params;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const saleInstance = await this.findSaleByIdService.execute({
      sale_id,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(saleInstance));
  }
}

export { FindSaleByIdController };
