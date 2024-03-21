import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { verifyParamProductId } from '../middlewares/verifyParamId';
import { createProductMiddleware } from '../middlewares/validators/Product/createProduct';
import { createProductController } from '../main/Product/createProduct';
import { deleteProductController } from '../main/Product/deleteProduct';
import { findProductByIdController } from '../main/Product/findProductById';
import { updateProductController } from '../main/Product/updateProduct';
import { updateProductMiddleware } from '../middlewares/validators/Product/updateProduct';
import { findProductByCompanyController } from '../main/Product/findProductByCompany';
import { findProductByCompanyMiddleware } from '../middlewares/validators/Product/findProductByCompany';
import { findProductCountController } from '../main/Product/findProductCount';
import { searchProductByNameController } from '../main/Product/searchProductByName';
import { searchProductByNameMiddleware } from '../middlewares/validators/Product/searchProductByName';
import { findProductAlertController } from '../main/Product/findProductAlert';

const productRouter = Router();

productRouter.post(
  '/product',
  [verifyToken, createProductMiddleware],
  async (req: Request, res: Response) => {
    return createProductController.handle(req, res);
  },
);

productRouter.get(
  '/product',
  [verifyToken, findProductByCompanyMiddleware],
  async (req: Request, res: Response) => {
    return findProductByCompanyController.handle(req, res);
  },
);

productRouter.get(
  '/product/alert',
  verifyToken,
  async (req: Request, res: Response) => {
    return findProductAlertController.handle(req, res);
  },
);

productRouter.get(
  '/product/search',
  [verifyToken, searchProductByNameMiddleware],
  async (req: Request, res: Response) => {
    return searchProductByNameController.handle(req, res);
  },
);

productRouter.get(
  '/product/count',
  verifyToken,
  async (req: Request, res: Response) => {
    return findProductCountController.handle(req, res);
  },
);

productRouter.get(
  '/product/:product_id',
  [verifyToken, verifyParamProductId],
  async (req: Request, res: Response) => {
    return findProductByIdController.handle(req, res);
  },
);

productRouter.put(
  '/product',
  [verifyToken, updateProductMiddleware],
  async (req: Request, res: Response) => {
    return updateProductController.handle(req, res);
  },
);

productRouter.delete(
  '/product/:product_id',
  [verifyToken, verifyParamProductId],
  async (req: Request, res: Response) => {
    return deleteProductController.handle(req, res);
  },
);

export { productRouter };
