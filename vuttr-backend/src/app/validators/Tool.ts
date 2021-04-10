import { celebrate, Joi, Segments } from 'celebrate';

export const ToolsValidatorGet = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    tag: Joi.string(),
  }),
});

export const ToolsValidatorPost = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    link: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  }),
});

export const ToolsValidatorDelete = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});
