import { celebrate, Segments, Joi } from 'celebrate';

export const updatePasswordMiddleware = celebrate({
  [Segments.BODY]: {
    user_id: Joi.string().uuid().required(),
    password: Joi.string().min(6).allow(''),
    new_password: Joi.string().min(6).required(),
  },
});
