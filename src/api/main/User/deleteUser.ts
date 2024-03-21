import { DeleteUserController } from '@controllers/User/DeleteUserController';

function DeleteUserControllerFactory() {
  const deleteUserController = new DeleteUserController();

  return deleteUserController;
}

const deleteUserController = DeleteUserControllerFactory();

export { deleteUserController };
