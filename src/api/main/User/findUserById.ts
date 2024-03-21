import { FindUserByIdController } from '@controllers/User/FindUserByIdController';

function FindUserdByIdControllerFactory() {
  const findUserdByIdController = new FindUserByIdController();

  return findUserdByIdController;
}

const findUserdByIdController = FindUserdByIdControllerFactory();

export { findUserdByIdController };
