import { LoginService } from '@services/Authorization/LoginService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = container.resolve(LoginService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { login, password } = req.body;

    const { accessToken, user } = await this.loginService.execute({
      login: login.trim(),
      password,
    });

    return res.status(200).json({
      user: instanceToInstance(user),
      accessToken,
    });
  }
}

export { LoginController };
