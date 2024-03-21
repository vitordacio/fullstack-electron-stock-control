import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { FindCategoryByCompanyService } from '@services/Category/FindCategory/FindCategoryByCompanyService';

class FindCategoryByCompanyController {
  private findCategoriesService: FindCategoryByCompanyService;

  constructor() {
    this.findCategoriesService = container.resolve(
      FindCategoryByCompanyService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, page, limit } = req.query;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const categoryInstance = await this.findCategoriesService.execute({
      name: name as string,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(categoryInstance));
  }
}

export { FindCategoryByCompanyController };
