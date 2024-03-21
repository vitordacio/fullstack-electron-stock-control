import { authorize } from './authorizeUser';

function hasPermission<T extends Partial<AppPermissions>>(
  user: ExpressUser,
  permission: T,
): user is AuthorizedUser<T> {
  return authorize(user, permission).type === 'ok';
}

export { hasPermission };
