import { CreateSaleController } from '@controllers/Sale/CreateSaleController';

function CreateSaleControllerFactory() {
  const createSaleController = new CreateSaleController();

  return createSaleController;
}

const createSaleController = CreateSaleControllerFactory();

export { createSaleController };
