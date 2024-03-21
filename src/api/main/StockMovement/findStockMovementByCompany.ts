import { FindStockMovementByCompanyController } from '@controllers/StockMovement/FindStockMovementByCompanyController';

function FindStockMovementByCompanyControllerFactory() {
  const findStockMovementByCompanyController =
    new FindStockMovementByCompanyController();

  return findStockMovementByCompanyController;
}

const findStockMovementByCompanyController =
  FindStockMovementByCompanyControllerFactory();

export { findStockMovementByCompanyController };
