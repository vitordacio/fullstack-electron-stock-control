import { celebrate, Segments, Joi } from 'celebrate';

export const createProductMiddleware = celebrate({
  [Segments.BODY]: {
    category_id: Joi.string().uuid().allow(''),
    name: Joi.string().min(3).required(),
    code: Joi.string().allow(''),
    price: Joi.number().required(),
    price_cost: Joi.number().allow(''),
    stock_local_qtd: Joi.number().allow(''),
    stock_local_min: Joi.number().allow(''),
    stock_local_max: Joi.number().allow(''),
    stock_store_qtd: Joi.number().allow(''),
    stock_store_min: Joi.number().allow(''),
    stock_store_max: Joi.number().allow(''),
    actived: Joi.boolean().required(),
  },
});
