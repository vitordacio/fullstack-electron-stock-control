import { FindUserCountController } from '@controllers/User/FindUserCountController';

function FindUserdCountControllerFactory() {
  const findUserCountController = new FindUserCountController();

  return findUserCountController;
}

const findUserCountController = FindUserdCountControllerFactory();

export { findUserCountController };
