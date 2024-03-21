import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, companyPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdateUserService } from '@services/User/UpdateUser/UpdateUserService';

class UpdateUserController {
  private updateUserService: UpdateUserService;

  constructor() {
    this.updateUserService = container.resolve(UpdateUserService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id, name, email, username, actived } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, companyPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const user = await this.updateUserService.execute({
      user_id,
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      actived,
      reqUser: req.user,
    });

    return res.status(200).json(instanceToPlain(user));
  }
}

export { UpdateUserController };
