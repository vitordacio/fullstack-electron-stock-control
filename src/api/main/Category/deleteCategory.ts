import { DeleteCategoryController } from '@controllers/Category/DeleteCategoryController';

function DeleteCategoryControllerFactory() {
  const deleteCategoryController = new DeleteCategoryController();

  return deleteCategoryController;
}

const deleteCategoryController = DeleteCategoryControllerFactory();

export { deleteCategoryController };
