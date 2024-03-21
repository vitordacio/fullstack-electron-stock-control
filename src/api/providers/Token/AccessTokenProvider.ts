import { sign } from 'jsonwebtoken';
import { token } from '@config/auth';

function generateAccessToken(userId: string, role: RoleOptions): string {
  const accessToken = sign({ sub: userId, role }, token.accessToken.secret, {
    expiresIn: token.accessToken.expiresIn,
  });

  return accessToken;
}

export { generateAccessToken };
