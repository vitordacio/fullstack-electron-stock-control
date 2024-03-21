import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { userPerm, companyPerm } from '@config/constants';
import { AppError } from '@utils/AppError';
import { hasPermission } from '@utils/hasPermission';
import { UpdatePasswordService } from '@services/User/UpdateUser/UpdatePasswordService';

class UpdatePasswordController {
  private updatePasswordService: UpdatePasswordService;

  constructor() {
    this.updatePasswordService = container.resolve(UpdatePasswordService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id, password, new_password } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, companyPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const user = await this.updatePasswordService.execute({
      user_id,
      password,
      new_password,
      reqUser: req.user,
    });

    return res.status(200).json(instanceToPlain(user));
  }
}

export { UpdatePasswordController };
