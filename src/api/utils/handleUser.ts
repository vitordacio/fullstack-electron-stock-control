export function clearUsername(username: string): string {
  username = username
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '');

  username = username.toLowerCase().replace(/\s+/g, '');
  return username;
}

export function isUsername(username: string): boolean {
  if (username.split(' ').length > 1) return false;
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  return usernameRegex.test(username);
}

export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
