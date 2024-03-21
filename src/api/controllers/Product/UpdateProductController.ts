import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { companyPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateProductService } from '@services/Product/UpdateProduct/UpdateProductService';

class UpdateProductController {
  private updateProductService: UpdateProductService;

  constructor() {
    this.updateProductService = container.resolve(UpdateProductService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const {
      product_id,
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

    const product = await this.updateProductService.execute({
      product_id,
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

    return res.status(200).json(instanceToPlain(product));
  }
}

export { UpdateProductController };
