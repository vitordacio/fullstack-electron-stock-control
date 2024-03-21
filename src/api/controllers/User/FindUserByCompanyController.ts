import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { FindUserByCompanyService } from '@services/User/FindUser/FindUserByCompanyService';

class FindUserByCompanyController {
  private findUseByCompanyService: FindUserByCompanyService;

  constructor() {
    this.findUseByCompanyService = container.resolve(FindUserByCompanyService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, situation, page, limit } = req.query;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const userInstance = await this.findUseByCompanyService.execute({
      name: name as string,
      situation: situation as string,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(userInstance));
  }
}

export { FindUserByCompanyController };
