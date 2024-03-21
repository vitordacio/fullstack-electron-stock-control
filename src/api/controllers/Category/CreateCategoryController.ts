import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { companyPerm } from '@config/constants';
import { CreateCategoryService } from '@services/Category/CreateCategory/CreateCategoryService';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';

class CreateCategoryController {
  private createCategoryService: CreateCategoryService;

  constructor() {
    this.createCategoryService = container.resolve(CreateCategoryService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const categoryInstance = await this.createCategoryService.execute({
      name: name.trim(),
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(categoryInstance));
  }
}

export { CreateCategoryController };
