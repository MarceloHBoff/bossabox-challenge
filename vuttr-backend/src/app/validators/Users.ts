import { celebrate, Joi, Segments } from 'celebrate';

export const UsersValidatorPost = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
