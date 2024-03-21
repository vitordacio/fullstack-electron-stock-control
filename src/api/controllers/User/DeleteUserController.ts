import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { companyPerm } from '@config/constants';
import { DeleteUserService } from '@services/User/DeleteUser/DeleteUserService';

class DeleteUserController {
  private deleteUserService: DeleteUserService;

  constructor() {
    this.deleteUserService = container.resolve(DeleteUserService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const userInstance = await this.deleteUserService.execute({
      user_id,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(userInstance));
  }
}

export { DeleteUserController };
