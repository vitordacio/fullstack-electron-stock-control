import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { admPerm } from '@config/constants';
import { FindProductsAlertService } from '@services/Product/FindProduct/FindProductsAlertService';

class FindProductsAlertController {
  private findProductAlertService: FindProductsAlertService;

  constructor() {
    this.findProductAlertService = container.resolve(FindProductsAlertService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (!hasPermission(req.user, admPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const productInstance = await this.findProductAlertService.execute();

    return res.status(201).json(instanceToPlain(productInstance));
  }
}

export { FindProductsAlertController };
