import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { FindProductByCompanyService } from '@services/Product/FindProduct/FindProductByCompanyService';

class FindProductByCompanyController {
  private findProductByCompanyService: FindProductByCompanyService;

  constructor() {
    this.findProductByCompanyService = container.resolve(
      FindProductByCompanyService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { situation, category_id, name, page, limit } = req.query;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const productInstance = await this.findProductByCompanyService.execute({
      reqUser: req.user,
      situation: situation as string,
      category_id: category_id as string,
      name: name as string,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
    });

    return res.status(201).json(instanceToPlain(productInstance));
  }
}

export { FindProductByCompanyController };
