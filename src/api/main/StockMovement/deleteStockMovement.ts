import { DeleteStockMovementController } from '@controllers/StockMovement/DeleteStockMovementController';

function DeleteStockMovementControllerFactory() {
  const deleteStockMovementController = new DeleteStockMovementController();

  return deleteStockMovementController;
}

const deleteStockMovementController = DeleteStockMovementControllerFactory();

export { deleteStockMovementController };
