import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { companyPerm } from '@config/constants';
import { CreateUserService } from '@services/User/CreateUser/CreateUserService';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';

class CreateUserController {
  private createUserService: CreateUserService;

  constructor() {
    this.createUserService = container.resolve(CreateUserService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, username, email, actived, role_name } = req.body;

    if (!hasPermission(req.user, companyPerm)) {
      throw new AppError('Operação não permitida.', 403);
    }

    const userInstance = await this.createUserService.execute({
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      actived,
      role_name,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(userInstance));
  }
}

export { CreateUserController };
