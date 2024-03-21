import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyParamStockMovementId } from '../middlewares/verifyParamId';
import { createStockMovementMiddleware } from '../middlewares/validators/StockMovement/createStockMovement';
import { createStockMovementController } from '../main/StockMovement/createStockMovement';
import { findStockMovementByIdController } from '../main/StockMovement/findStockMovementById';
import { findStockMovementByCompanyController } from '../main/StockMovement/findStockMovementByCompany';
import { deleteStockMovementController } from '../main/StockMovement/deleteStockMovement';

import { findStockMovementByCompanyMiddleware } from '../middlewares/validators/StockMovement/findStockMovementByCompany';

const stockMovementRouter = Router();

stockMovementRouter.post(
  '/stock',
  [verifyToken, createStockMovementMiddleware],
  async (req: Request, res: Response) => {
    return createStockMovementController.handle(req, res);
  },
);

stockMovementRouter.get(
  '/stock',
  [verifyToken, findStockMovementByCompanyMiddleware],
  async (req: Request, res: Response) => {
    return findStockMovementByCompanyController.handle(req, res);
  },
);

stockMovementRouter.get(
  '/stock/:stock_movement_id',
  [verifyToken, verifyParamStockMovementId],
  async (req: Request, res: Response) => {
    return findStockMovementByIdController.handle(req, res);
  },
);

stockMovementRouter.delete(
  '/stock/:stock_movement_id',
  [verifyToken, verifyParamStockMovementId],
  async (req: Request, res: Response) => {
    return deleteStockMovementController.handle(req, res);
  },
);

export { stockMovementRouter };
