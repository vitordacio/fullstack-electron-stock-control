import { celebrate, Segments, Joi } from 'celebrate';

export const createSaleMiddleware = celebrate({
  [Segments.BODY]: {
    cash: Joi.number().allow(''),
    pix: Joi.number().allow(''),
    debit: Joi.number().allow(''),
    credit: Joi.number().allow(''),
    discount: Joi.number().required(),
    change: Joi.number().required(),
    received: Joi.number().required(),
    subtotal: Joi.number().required(),
    total: Joi.number().required(),
    stock_movements: Joi.array()
      .items(
        Joi.object({
          product_id: Joi.string().uuid().required(),
          store_out: Joi.number().required(),
          price: Joi.number().required(),
        }).required(),
      )
      .required(),
  },
});
