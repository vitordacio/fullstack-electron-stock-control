import { DeleteSaleController } from '@controllers/Sale/DeleteSaleController';

function DeleteSaleControllerFactory() {
  const deleteSaleController = new DeleteSaleController();

  return deleteSaleController;
}

const deleteSaleController = DeleteSaleControllerFactory();

export { deleteSaleController };
