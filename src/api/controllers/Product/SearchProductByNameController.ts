import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm, userPerm } from '@config/constants';
import { SearchProductByNameService } from '@services/Product/FindProduct/SearchProductByName';

class SearchProductByNameController {
  private findProductByCompanyService: SearchProductByNameService;

  constructor() {
    this.findProductByCompanyService = container.resolve(
      SearchProductByNameService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, page, limit } = req.query;

    if (
      !hasPermission(req.user, companyPerm) &&
      !hasPermission(req.user, userPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const productInstance = await this.findProductByCompanyService.execute({
      reqUser: req.user,
      name: name as string,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
    });

    return res.status(201).json(instanceToPlain(productInstance));
  }
}

export { SearchProductByNameController };
