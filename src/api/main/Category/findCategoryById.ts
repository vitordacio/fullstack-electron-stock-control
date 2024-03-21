import { FindCategoryByIdController } from '@controllers/Category/FindCategoryByIdController';

function FindCategoryByIdControllerFactory() {
  const findCategoryByIdController = new FindCategoryByIdController();

  return findCategoryByIdController;
}

const findCategoryByIdController = FindCategoryByIdControllerFactory();

export { findCategoryByIdController };
