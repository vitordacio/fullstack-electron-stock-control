import { UpdateCategoryController } from '@controllers/Category/UpdateCategoryController';

function UpdateCategoryControllerFactory() {
  const updateCategoryController = new UpdateCategoryController();

  return updateCategoryController;
}

const updateCategoryController = UpdateCategoryControllerFactory();

export { updateCategoryController };
