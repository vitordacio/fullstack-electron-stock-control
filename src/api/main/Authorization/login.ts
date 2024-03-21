import { LoginController } from '@controllers/Authorization/LoginController';

function LoginControllerFactory() {
  const loginController = new LoginController();

  return loginController;
}

const loginController = LoginControllerFactory();

export { loginController };
