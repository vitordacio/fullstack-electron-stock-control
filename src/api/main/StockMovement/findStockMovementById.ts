import { FindStockMovementByIdController } from '@controllers/StockMovement/FindStockMovementByIdController';

function FindStockMovementByIdControllerFactory() {
  const findStockMovementByIdController = new FindStockMovementByIdController();

  return findStockMovementByIdController;
}

const findStockMovementByIdController =
  FindStockMovementByIdControllerFactory();

export { findStockMovementByIdController };
