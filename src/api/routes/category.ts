import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyParamCategoryId } from '../middlewares/verifyParamId';
import { createCategoryMiddleware } from '../middlewares/validators/Category/createCategory';
import { createCategoryController } from '../main/Category/createCategory';
import { findCategoryByIdController } from '../main/Category/findCategoryById';
import { findCategoryByCompanyController } from '../main/Category/findCategoryByCompany';
import { deleteCategoryController } from '../main/Category/deleteCategory';
import { updateCategoryMiddleware } from '../middlewares/validators/Category/updateCategory';
import { updateCategoryController } from '../main/Category/updateCategory';
import { findCategoryCountController } from '../main/Category/findCategoryCount';
import { findCategoryIndexController } from '../main/Category/findCategoryIndex';
import { findCategoryByCompanyMiddleware } from '../middlewares/validators/Category/findCategoryByCompany';

const categoryRouter = Router();

categoryRouter.post(
  '/category',
  [verifyToken, createCategoryMiddleware],
  async (req: Request, res: Response) => {
    return createCategoryController.handle(req, res);
  },
);

categoryRouter.get(
  '/category',
  [verifyToken, findCategoryByCompanyMiddleware],
  async (req: Request, res: Response) => {
    return findCategoryByCompanyController.handle(req, res);
  },
);

categoryRouter.get(
  '/category/index',
  verifyToken,
  async (req: Request, res: Response) => {
    return findCategoryIndexController.handle(req, res);
  },
);

categoryRouter.get(
  '/category/count',
  verifyToken,
  async (req: Request, res: Response) => {
    return findCategoryCountController.handle(req, res);
  },
);

categoryRouter.get(
  '/category/:category_id',
  [verifyToken, verifyParamCategoryId],
  async (req: Request, res: Response) => {
    return findCategoryByIdController.handle(req, res);
  },
);

categoryRouter.put(
  '/category',
  [verifyToken, updateCategoryMiddleware],
  async (req: Request, res: Response) => {
    return updateCategoryController.handle(req, res);
  },
);

categoryRouter.delete(
  '/category/:category_id',
  [verifyToken, verifyParamCategoryId],
  async (req: Request, res: Response) => {
    return deleteCategoryController.handle(req, res);
  },
);

export { categoryRouter };
