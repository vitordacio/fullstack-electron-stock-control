import { FindProductsAlertController } from '@controllers/Product/FindProductsAlertController';

function FindProductsAlertControllerFactory() {
  const findProductsAlertController = new FindProductsAlertController();

  return findProductsAlertController;
}

const findProductsAlertController = FindProductsAlertControllerFactory();

export { findProductsAlertController };
