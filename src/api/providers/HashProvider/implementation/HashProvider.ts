import bcrypt from 'bcrypt';
import { IHashProvider } from '../IHashProvider';

class HashProvider implements IHashProvider {
  async generateHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 8);

    return hash;
  }

  async validateHash(password: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, hash);

    return isValid;
  }
}

export { HashProvider };
