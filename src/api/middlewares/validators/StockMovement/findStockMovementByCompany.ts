import { celebrate, Segments, Joi } from 'celebrate';

export const findStockMovementByCompanyMiddleware = celebrate({
  [Segments.QUERY]: {
    product_id: Joi.string().required(),
    page: Joi.number().allow(''),
    limit: Joi.number().allow(''),
  },
});
