import { UpdatePasswordController } from '@controllers/User/UpdatePasswordController';

function UpdatePasswordControllerFactory() {
  const updatePasswordController = new UpdatePasswordController();

  return updatePasswordController;
}

const updatePasswordController = UpdatePasswordControllerFactory();

export { updatePasswordController };
