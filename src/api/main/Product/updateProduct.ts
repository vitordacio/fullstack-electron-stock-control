import { UpdateProductController } from '@controllers/Product/UpdateProductController';

function UpdateProductControllerFactory() {
  const updateProductController = new UpdateProductController();

  return updateProductController;
}

const updateProductController = UpdateProductControllerFactory();

export { updateProductController };
