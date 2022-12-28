const { Joi } = require('celebrate');

const updateUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).required(true).max(30),
    email: Joi.string().required(true).email(),
  }),
};

module.exports = { updateUserValidation };
