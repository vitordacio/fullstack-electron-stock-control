import { celebrate, Segments, Joi } from 'celebrate';

export const createCategoryMiddleware = celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(3).required(),
  },
});
