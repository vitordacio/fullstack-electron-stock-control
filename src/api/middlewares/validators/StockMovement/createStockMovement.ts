import { celebrate, Segments, Joi } from 'celebrate';

export const createStockMovementMiddleware = celebrate({
  [Segments.BODY]: {
    product_id: Joi.string().uuid().required(),
    price: Joi.number().allow(''),
    local_in: Joi.number().allow(''),
    local_out: Joi.number().allow(''),
    store_in: Joi.number().allow(''),
    store_out: Joi.number().allow(''),
  },
});
