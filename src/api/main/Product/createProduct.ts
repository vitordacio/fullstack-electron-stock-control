import { CreateProductController } from '@controllers/Product/CreateProductController';

function CreateProductControllerFactory() {
  const createProductController = new CreateProductController();

  return createProductController;
}

const createProductController = CreateProductControllerFactory();

export { createProductController };
