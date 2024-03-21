import { celebrate, Segments, Joi } from 'celebrate';

export const findSaleByDayMiddleware = celebrate({
  [Segments.QUERY]: {
    year: Joi.number().required(),
    month: Joi.number().required(),
    day: Joi.number().required(),
  },
});
