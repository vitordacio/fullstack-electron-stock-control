import { FindSaleByCompanyController } from '@controllers/Sale/FindSaleByCompanyController';

function FindSaledByCompanyControllerFactory() {
  const findSaleByCompanyController = new FindSaleByCompanyController();

  return findSaleByCompanyController;
}

const findSaleByCompanyController = FindSaledByCompanyControllerFactory();

export { findSaleByCompanyController };
