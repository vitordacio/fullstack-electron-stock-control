import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { FindUserByIdService } from '@services/User/FindUser/FindUserByIdService';

class FindUserByIdController {
  private findUserByIdService: FindUserByIdService;

  constructor() {
    this.findUserByIdService = container.resolve(FindUserByIdService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const userInstance = await this.findUserByIdService.execute({
      user_id,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(userInstance));
  }
}

export { FindUserByIdController };
