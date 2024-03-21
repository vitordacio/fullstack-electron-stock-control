import { FindProductCountController } from '@controllers/Product/FindProductCountController';

function FindProductdCountControllerFactory() {
  const findProductCountController = new FindProductCountController();

  return findProductCountController;
}

const findProductCountController = FindProductdCountControllerFactory();

export { findProductCountController };
