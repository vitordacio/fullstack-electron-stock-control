import { FindSaleCountController } from '@controllers/Sale/FindSaleCountController';

function FindSaledCountControllerFactory() {
  const findSaleCountController = new FindSaleCountController();

  return findSaleCountController;
}

const findSaleCountController = FindSaledCountControllerFactory();

export { findSaleCountController };
