import { CreateUserController } from '@controllers/User/CreateUserController';

function CreateUserControllerFactory() {
  const createUserController = new CreateUserController();

  return createUserController;
}

const createUserController = CreateUserControllerFactory();

export { createUserController };
