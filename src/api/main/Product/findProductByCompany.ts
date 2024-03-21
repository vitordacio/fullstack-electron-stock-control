import { FindProductByCompanyController } from '@controllers/Product/FindProductByCompanyController';

function FindProductdByCompanyControllerFactory() {
  const findProductByCompanyController = new FindProductByCompanyController();

  return findProductByCompanyController;
}

const findProductByCompanyController = FindProductdByCompanyControllerFactory();

export { findProductByCompanyController };
