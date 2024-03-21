import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { DeleteSaleService } from '@services/Sale/DeleteSale/DeleteSaleService';

class DeleteSaleController {
  private deleteSaleService: DeleteSaleService;

  constructor() {
    this.deleteSaleService = container.resolve(DeleteSaleService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { sale_id } = req.params;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const saleInstance = await this.deleteSaleService.execute({
      sale_id,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(saleInstance));
  }
}

export { DeleteSaleController };
