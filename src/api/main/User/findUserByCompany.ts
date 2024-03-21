import { FindUserByCompanyController } from '@controllers/User/FindUserByCompanyController';

function FindUserByCompanyControllerFactory() {
  const findUserByCompanyController = new FindUserByCompanyController();

  return findUserByCompanyController;
}

const findUserByCompanyController = FindUserByCompanyControllerFactory();

export { findUserByCompanyController };
