declare type RoleOptions = 'master' | 'company' | 'adm' | 'user';

declare type ExpressUser = {
  id: string;
  role: RoleOptions;
};

declare const phantom: unique symbol;

declare type AuthorizedUser<T extends Partial<typeof permissions>> =
  ExpressUser & {
    [phantom]: T;
  };

declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Request {
    user: ExpressUser;
  }
}
