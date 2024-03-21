import { FindSaleByIdController } from '@controllers/Sale/FindSaleByIdController';

function FindSaleByIdControllerFactory() {
  const findSaleByIdController = new FindSaleByIdController();

  return findSaleByIdController;
}

const findSaleByIdController = FindSaleByIdControllerFactory();

export { findSaleByIdController };
