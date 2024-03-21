import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { companyPerm } from '@config/constants';
import { CreateProductService } from '@services/Product/CreateProduct/CreateProductService';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';

class CreateProductController {
  private createProductService: CreateProductService;

  constructor() {
    this.createProductService = container.resolve(CreateProductService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const {
      category_id,
      name,
      code,
      price,
      price_cost,
      stock_local_qtd,
      stock_local_min,
      stock_local_max,
      stock_store_qtd,
      stock_store_min,
      stock_store_max,
      actived,
    } = req.body;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const productInstance = await this.createProductService.execute({
      category_id,
      name: name.trim(),
      code: code.trim(),
      price,
      price_cost,
      stock_local_qtd,
      stock_local_min,
      stock_local_max,
      stock_store_qtd,
      stock_store_min,
      stock_store_max,
      actived,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(productInstance));
  }
}

export { CreateProductController };
