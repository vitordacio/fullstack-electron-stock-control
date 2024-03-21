import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { verifyParamSaleId } from '../middlewares/verifyParamId';
import { createSaleMiddleware } from '../middlewares/validators/Sale/createSale';
import { createSaleController } from '../main/Sale/createSale';
import { deleteSaleController } from '../main/Sale/deleteSale';
import { findSaleByIdController } from '../main/Sale/findSaleById';
import { findSaleByCompanyController } from '../main/Sale/findSaleByCompany';
import { findSaleCountController } from '../main/Sale/findSaleCount';
import { verifyPageLimit } from '../middlewares/verifyPageLimit';
import { findSaleByDayMiddleware } from '../middlewares/validators/Sale/findSaleByDay';
import { findSaleByDayController } from '../main/Sale/findSaleByDay';
import { findSaleByMonthController } from '../main/Sale/findSaleByMonth';
import { findSaleByMonthMiddleware } from '../middlewares/validators/Sale/findSaleByMonth';

const saleRouter = Router();

saleRouter.post(
  '/sale',
  [verifyToken, createSaleMiddleware],
  async (req: Request, res: Response) => {
    return createSaleController.handle(req, res);
  },
);

saleRouter.get(
  '/sale',
  [verifyToken, verifyPageLimit],
  async (req: Request, res: Response) => {
    return findSaleByCompanyController.handle(req, res);
  },
);

saleRouter.get(
  '/sale/day',
  [verifyToken, findSaleByDayMiddleware],
  async (req: Request, res: Response) => {
    return findSaleByDayController.handle(req, res);
  },
);

saleRouter.get(
  '/sale/month',
  [verifyToken, findSaleByMonthMiddleware],
  async (req: Request, res: Response) => {
    return findSaleByMonthController.handle(req, res);
  },
);

saleRouter.get(
  '/sale/count',
  verifyToken,
  async (req: Request, res: Response) => {
    return findSaleCountController.handle(req, res);
  },
);

saleRouter.get(
  '/sale/:sale_id',
  [verifyToken, verifyParamSaleId],
  async (req: Request, res: Response) => {
    return findSaleByIdController.handle(req, res);
  },
);

saleRouter.delete(
  '/sale/:sale_id',
  [verifyToken, verifyParamSaleId],
  async (req: Request, res: Response) => {
    return deleteSaleController.handle(req, res);
  },
);

export { saleRouter };
