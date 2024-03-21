import { celebrate, Segments, Joi } from 'celebrate';

export const createUserMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    role_name: Joi.string().valid('company', 'adm', 'user').required(),
    actived: Joi.boolean().required(),
  },
});
