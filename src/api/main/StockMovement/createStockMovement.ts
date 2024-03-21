import { CreateStockMovementController } from '@controllers/StockMovement/CreateStockMovementController';

function CreateStockMovementControllerFactory() {
  const createStockMovementController = new CreateStockMovementController();

  return createStockMovementController;
}

const createStockMovementController = CreateStockMovementControllerFactory();

export { createStockMovementController };
