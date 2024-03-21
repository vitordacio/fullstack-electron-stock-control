import { celebrate, Segments, Joi } from 'celebrate';

export const updateUserMiddleware = celebrate({
  [Segments.BODY]: {
    user_id: Joi.string().uuid().required(),
    name: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    actived: Joi.boolean().required(),
  },
});
