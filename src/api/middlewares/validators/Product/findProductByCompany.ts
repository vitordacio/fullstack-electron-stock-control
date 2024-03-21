import { celebrate, Segments, Joi } from 'celebrate';

export const findProductByCompanyMiddleware = celebrate({
  [Segments.QUERY]: {
    situation: Joi.string()
      .valid('latest', 'actived_true', 'actived_false', 'deleted')
      .required(),
    category_id: Joi.string().allow(''),
    name: Joi.string().allow(''),
    page: Joi.number().allow(''),
    limit: Joi.number().allow(''),
  },
});
