import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { FindProductAlertService } from '@services/Product/FindProduct/FindProductAlertService';

class FindProductAlertController {
  private findProductAlertService: FindProductAlertService;

  constructor() {
    this.findProductAlertService = container.resolve(FindProductAlertService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { situation } = req.query;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const productInstance = await this.findProductAlertService.execute({
      situation: situation as string,
      reqUser: req.user,
    });

    return res.status(200).json(instanceToPlain(productInstance));
  }
}

export { FindProductAlertController };
