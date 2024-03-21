import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { FindUserCountService } from '@services/User/FindUser/FindUserCountService';

class FindUserCountController {
  private findUserCountService: FindUserCountService;

  constructor() {
    this.findUserCountService = container.resolve(FindUserCountService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const productInstance = await this.findUserCountService.execute(req.user);

    return res.status(201).json(instanceToPlain(productInstance));
  }
}

export { FindUserCountController };
