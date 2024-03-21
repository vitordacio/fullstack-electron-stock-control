import { celebrate, Segments, Joi } from 'celebrate';

export const findCategoryByCompanyMiddleware = celebrate({
  [Segments.QUERY]: {
    name: Joi.string().allow(''),
    page: Joi.number().allow(''),
    limit: Joi.number().allow(''),
  },
});
