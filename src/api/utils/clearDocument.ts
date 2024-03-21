export const clearusername = (username: string): string => {
  return username.replace(/\D/g, '');
};
