import { celebrate, Segments, Joi } from 'celebrate';

export const verifyParamUserId = celebrate({
  [Segments.PARAMS]: {
    user_id: Joi.string().uuid().required(),
  },
});

export const verifyParamSaleId = celebrate({
  [Segments.PARAMS]: {
    sale_id: Joi.string().uuid().required(),
  },
});

export const verifyParamCategoryId = celebrate({
  [Segments.PARAMS]: {
    category_id: Joi.string().uuid().required(),
  },
});

export const verifyParamProductId = celebrate({
  [Segments.PARAMS]: {
    product_id: Joi.string().uuid().required(),
  },
});

export const verifyParamStockMovementId = celebrate({
  [Segments.PARAMS]: {
    stock_movement_id: Joi.string().uuid().required(),
  },
});
