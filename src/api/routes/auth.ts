import { Request, Response, Router } from 'express';
import { loginMiddleware } from '../middlewares/validators/Authorization/login';
import { loginController } from '../main/Authorization/login';
import { verifyToken } from '../middlewares/verifyToken';
import { loginTokenController } from '../main/Authorization/loginToken';

const authRouter = Router();

authRouter.get('/check', async (req: Request, res: Response) => {
  return res.json({ message: 'Online' });
});

authRouter.post(
  '/auth',
  loginMiddleware,
  async (req: Request, res: Response) => {
    return loginController.handle(req, res);
  },
);

authRouter.post(
  '/auth/token',
  verifyToken,
  async (req: Request, res: Response) => {
    return loginTokenController.handle(req, res);
  },
);

export { authRouter };
