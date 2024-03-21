import { FindCategoryIndexController } from '@controllers/Category/FindCategoryIndexController';

function FindCategoryIndexControllerFactory() {
  const findCategoryIndexController = new FindCategoryIndexController();

  return findCategoryIndexController;
}

const findCategoryIndexController = FindCategoryIndexControllerFactory();

export { findCategoryIndexController };
