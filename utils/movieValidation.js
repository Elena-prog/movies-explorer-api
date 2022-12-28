const { Joi } = require('celebrate');
const { REGEXP_URL } = require('../constants');

const createMovieValidation = {
  body: Joi.object().keys({
    country: Joi.string().required(true),
    director: Joi.string().required(true),
    duration: Joi.number().required(true),
    year: Joi.string().required(true),
    description: Joi.string().required(true),
    image: Joi.string().required(true).regex(REGEXP_URL),
    trailerLink: Joi.string().required(true).regex(REGEXP_URL),
    thumbnail: Joi.string().required(true).regex(REGEXP_URL),
    movieId: Joi.number().required(true),
    nameRU: Joi.string().required(true),
    nameEN: Joi.string().required(true),
  }),
};

const paramsValidation = {
  params: Joi.object().keys({
    _id: Joi.string().hex().required(true).length(24),
  }),
};

module.exports = { createMovieValidation, paramsValidation };
