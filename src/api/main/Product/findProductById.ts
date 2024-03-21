import { FindProductByIdController } from '@controllers/Product/FindProductByIdController';

function FindProductByIdControllerFactory() {
  const findProductByIdController = new FindProductByIdController();

  return findProductByIdController;
}

const findProductByIdController = FindProductByIdControllerFactory();

export { findProductByIdController };
