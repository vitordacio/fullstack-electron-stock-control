import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { FindCategoryIndexService } from '@services/Category/FindCategory/FindCategoryIndexService';

class FindCategoryIndexController {
  private findCategoriesService: FindCategoryIndexService;

  constructor() {
    this.findCategoriesService = container.resolve(FindCategoryIndexService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const categoryInstance = await this.findCategoriesService.execute(req.user);

    return res.status(201).json(instanceToPlain(categoryInstance));
  }
}

export { FindCategoryIndexController };
