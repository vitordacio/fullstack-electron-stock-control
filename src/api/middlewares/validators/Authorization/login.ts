import { celebrate, Segments, Joi } from 'celebrate';

export const loginMiddleware = celebrate({
  [Segments.BODY]: {
    login: Joi.string().required(),
    password: Joi.string().required(),
  },
});
