import { FindCategoryByCompanyController } from '@controllers/Category/FindCategoryByCompanyController';

function FindCategoryByCompanyControllerFactory() {
  const findCategoryByCompanyController = new FindCategoryByCompanyController();

  return findCategoryByCompanyController;
}

const findCategoryByCompanyController =
  FindCategoryByCompanyControllerFactory();

export { findCategoryByCompanyController };
