import { UpdateUserController } from '@controllers/User/UpdateUserController';

function UpdateUserControllerFactory() {
  const updateUserController = new UpdateUserController();

  return updateUserController;
}

const updateUserController = UpdateUserControllerFactory();

export { updateUserController };
