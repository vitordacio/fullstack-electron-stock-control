import { CreateCategoryController } from '@controllers/Category/CreateCategoryController';

function CreateCategoryControllerFactory() {
  const createCategoryController = new CreateCategoryController();

  return createCategoryController;
}

const createCategoryController = CreateCategoryControllerFactory();

export { createCategoryController };
