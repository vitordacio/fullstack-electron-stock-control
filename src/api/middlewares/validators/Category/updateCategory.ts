import { celebrate, Segments, Joi } from 'celebrate';

export const updateCategoryMiddleware = celebrate({
  [Segments.BODY]: {
    category_id: Joi.string().uuid().required(),
    name: Joi.string().min(3).required(),
  },
});
