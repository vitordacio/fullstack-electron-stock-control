import { LoginTokenController } from '../../controllers/Authorization/LoginTokenController';

function LoginTokenControllerFactory() {
  const loginTokenController = new LoginTokenController();

  return loginTokenController;
}

const loginTokenController = LoginTokenControllerFactory();

export { loginTokenController };
