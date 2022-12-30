const { Joi } = require('celebrate');

const updateUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).required().max(30),
    email: Joi.string().required().email(),
  }),
};

module.exports = { updateUserValidation };
