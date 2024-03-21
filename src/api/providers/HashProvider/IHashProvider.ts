export interface IHashProvider {
  generateHash(password: string): Promise<string>;
  validateHash(password: string, hash: string): Promise<boolean>;
}
