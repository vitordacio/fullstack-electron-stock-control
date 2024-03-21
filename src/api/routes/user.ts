import { Request, Response, Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';

import { createUserController } from '../main/User/createUser';
import { createUserMiddleware } from '../middlewares/validators/User/createUser';
import { deleteUserController } from '../main/User/deleteUser';
import { findUserdByIdController } from '../main/User/findUserById';
import { findUserByCompanyController } from '../main/User/findUserByCompany';
import { updatePasswordController } from '../main/User/updatePassword';
import { verifyParamUserId } from '../middlewares/verifyParamId';
import { updatePasswordMiddleware } from '../middlewares/validators/User/updatePassword';
import { updateUserMiddleware } from '../middlewares/validators/User/updateUser';
import { updateUserController } from '../main/User/updateUser';
import { findUserByCompanyMiddleware } from '../middlewares/validators/User/findUserByCompany';
import { findUserCountController } from '../main/User/findUserCount';

const userRouter = Router();

userRouter.post(
  '/user',
  [verifyToken, createUserMiddleware],
  async (req: Request, res: Response) => {
    return createUserController.handle(req, res);
  },
);

userRouter.get(
  '/user',
  [verifyToken, findUserByCompanyMiddleware],
  async (req: Request, res: Response) => {
    return findUserByCompanyController.handle(req, res);
  },
);

userRouter.get(
  '/user/count',
  verifyToken,
  async (req: Request, res: Response) => {
    return findUserCountController.handle(req, res);
  },
);

userRouter.get(
  '/user/:user_id',
  [verifyToken, verifyParamUserId],
  async (req: Request, res: Response) => {
    return findUserdByIdController.handle(req, res);
  },
);

userRouter.put(
  '/user',
  [verifyToken, updateUserMiddleware],
  async (req: Request, res: Response) => {
    return updateUserController.handle(req, res);
  },
);

userRouter.put(
  '/user/password',
  [verifyToken, updatePasswordMiddleware],
  async (req: Request, res: Response) => {
    return updatePasswordController.handle(req, res);
  },
);

userRouter.delete(
  '/user/:user_id',
  [verifyToken, verifyParamUserId],
  async (req: Request, res: Response) => {
    return deleteUserController.handle(req, res);
  },
);

export { userRouter };
