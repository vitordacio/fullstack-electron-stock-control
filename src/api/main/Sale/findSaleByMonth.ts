import { FindSaleByMonthController } from '@controllers/Sale/FindSaleByMonthController';

function FindSaledByMonthControllerFactory() {
  const findSaleByMonthController = new FindSaleByMonthController();

  return findSaleByMonthController;
}

const findSaleByMonthController = FindSaledByMonthControllerFactory();

export { findSaleByMonthController };
