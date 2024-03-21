const token = {
  accessToken: {
    secret: process.env.JWT_AUTH_SECRET || 'default',
    expiresIn: 60 * 60 * 24 * 365,
  },
};

export { token };
