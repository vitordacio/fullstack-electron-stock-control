import { FindSaleByDayController } from '@controllers/Sale/FindSaleByDayController';

function FindSaledByDayControllerFactory() {
  const findSaleByDayController = new FindSaleByDayController();

  return findSaleByDayController;
}

const findSaleByDayController = FindSaledByDayControllerFactory();

export { findSaleByDayController };
