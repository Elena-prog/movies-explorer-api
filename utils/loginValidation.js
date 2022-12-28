const { Joi } = require('celebrate');

const registrationValidation = {
  body: Joi.object().keys({
    email: Joi.string().required(true).email(),
    password: Joi.string().required(true),
    name: Joi.string().min(2).max(30).required(true),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required(true).email(),
    password: Joi.string().required(true),
  }),
};

module.exports = { registrationValidation, loginValidation };
