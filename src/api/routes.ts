import { Router } from 'express';

import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { categoryRouter } from './routes/category';
import { productRouter } from './routes/product';
import { stockMovementRouter } from './routes/stockMovement';
import { saleRouter } from './routes/sale';

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(categoryRouter);
router.use(productRouter);
router.use(stockMovementRouter);
router.use(saleRouter);

export { router };
