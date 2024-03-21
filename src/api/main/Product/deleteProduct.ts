import { DeleteProductController } from '@controllers/Product/DeleteProductController';

function DeleteProductControllerFactory() {
  const deleteProductController = new DeleteProductController();

  return deleteProductController;
}

const deleteProductController = DeleteProductControllerFactory();

export { deleteProductController };
