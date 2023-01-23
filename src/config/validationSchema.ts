import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().allow('development', 'production').default('development'),
  PORT: Joi.number().default(3000),
});
