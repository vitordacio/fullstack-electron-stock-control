import { celebrate, Segments, Joi } from 'celebrate';

export const findUserByCompanyMiddleware = celebrate({
  [Segments.QUERY]: {
    situation: Joi.string()
      .valid('latest', 'actived_true', 'actived_false', 'deleted')
      .required(),
    name: Joi.string().allow(''),
    page: Joi.number().allow(''),
    limit: Joi.number().allow(''),
  },
});
