import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { companyPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateCategoryService } from '@services/Category/UpdateCategory/UpdateCategoryService';

class UpdateCategoryController {
  private updateCategoryService: UpdateCategoryService;

  constructor() {
    this.updateCategoryService = container.resolve(UpdateCategoryService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { category_id, name } = req.body;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const category = await this.updateCategoryService.execute({
      category_id,
      name,
      reqUser: req.user,
    });

    return res.status(200).json(instanceToPlain(category));
  }
}

export { UpdateCategoryController };
