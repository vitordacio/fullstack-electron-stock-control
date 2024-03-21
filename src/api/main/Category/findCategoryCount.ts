import { FindCategoryCountController } from '@controllers/Category/FindCategoryCountController';

function FindCategorydCountControllerFactory() {
  const findCategoryCountController = new FindCategoryCountController();

  return findCategoryCountController;
}

const findCategoryCountController = FindCategorydCountControllerFactory();

export { findCategoryCountController };
