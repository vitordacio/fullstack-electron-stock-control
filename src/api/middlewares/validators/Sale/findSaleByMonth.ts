import { celebrate, Segments, Joi } from 'celebrate';

export const findSaleByMonthMiddleware = celebrate({
  [Segments.QUERY]: {
    year: Joi.number().required(),
    month: Joi.number().required(),
  },
});
