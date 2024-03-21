import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { DeleteProductService } from '@services/Product/DeleteProduct/DeleteProductService';

class DeleteProductController {
  private deleteProductService: DeleteProductService;

  constructor() {
    this.deleteProductService = container.resolve(DeleteProductService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { product_id } = req.params;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const productInstance = await this.deleteProductService.execute({
      product_id,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(productInstance));
  }
}

export { DeleteProductController };
