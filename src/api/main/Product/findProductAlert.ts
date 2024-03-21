import { FindProductAlertController } from '@controllers/Product/FindProductAlertController';

function FindProductdAlertControllerFactory() {
  const findProductAlertController = new FindProductAlertController();

  return findProductAlertController;
}

const findProductAlertController = FindProductdAlertControllerFactory();

export { findProductAlertController };
