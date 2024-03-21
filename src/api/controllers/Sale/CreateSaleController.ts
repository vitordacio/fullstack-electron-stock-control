import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { companyPerm, userPerm } from '@config/constants';
import { CreateSaleService } from '@services/Sale/CreateSale/CreateSaleService';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';

class CreateSaleController {
  private createSaleService: CreateSaleService;

  constructor() {
    this.createSaleService = container.resolve(CreateSaleService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const {
      cash,
      pix,
      debit,
      credit,
      discount,
      change,
      received,
      subtotal,
      total,
      stock_movements,
    } = req.body;

    if (
      !hasPermission(req.user, companyPerm) &&
      !hasPermission(req.user, userPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const saleInstance = await this.createSaleService.execute({
      cash,
      pix,
      debit,
      credit,
      discount,
      change,
      received,
      subtotal,
      total,
      stock_movements,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(saleInstance));
  }
}

export { CreateSaleController };
