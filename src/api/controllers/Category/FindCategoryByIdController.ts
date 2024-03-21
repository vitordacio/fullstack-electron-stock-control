import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { FindCategoryByIdService } from '@services/Category/FindCategory/FindCategoryByIdService';

class FindCategoryByIdController {
  private findCategoryByIdService: FindCategoryByIdService;

  constructor() {
    this.findCategoryByIdService = container.resolve(FindCategoryByIdService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { category_id } = req.params;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const categoryInstance = await this.findCategoryByIdService.execute({
      category_id,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(categoryInstance));
  }
}

export { FindCategoryByIdController };
