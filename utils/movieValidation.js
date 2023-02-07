const { Joi } = require('celebrate');
const { REGEXP_URL } = require('../constants');

const createMovieValidation = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(REGEXP_URL),
    trailerLink: Joi.string().required().regex(REGEXP_URL),
    thumbnail: Joi.string().required().regex(REGEXP_URL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const paramsValidation = {
  params: Joi.object().keys({
    _id: Joi.string().hex().required().length(24),
  }),
};

module.exports = { createMovieValidation, paramsValidation };
