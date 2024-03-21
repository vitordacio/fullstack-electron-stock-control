import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@utils/AppError';
import { token as tokenConfig } from '@config/auth';

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(
      'Chave de acesso não encontrada! Por favor, realize o login novamente',
      404,
    );
  }

  const token = authHeader.split(' ')[1];

  let decoded;

  try {
    decoded = verify(token, tokenConfig.accessToken.secret);
  } catch (error) {
    throw new AppError(
      'Sessão Expirada! Por favor, realize o login novamente',
      401,
    );
  }

  const { sub, role } = decoded as {
    sub: string;
    role: RoleOptions;
  };

  req.user = {
    id: sub,
    role,
  };

  return next();
}
