const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  OK,
  CREATED,
  BAD_REQUEST_MESSAGE_INVALID_DATA,
  BAD_REQUEST_MESSAGE_INVALID_ID,
  FORBIDDEN_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE_MOVIE,
} = require('../constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((moviesData) => res.status(OK).send(moviesData))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((moviesData) => res.status(CREATED).send(moviesData))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST_MESSAGE_INVALID_DATA));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new NotFoundError(NOT_FOUND_MESSAGE_MOVIE))
    .then((movieData) => {
      if (req.user._id === movieData.owner.toString()) {
        movieData.remove()
          .then((deletedMovie) => res.status(OK).send(deletedMovie))
          .catch(next);
      } else {
        throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(BAD_REQUEST_MESSAGE_INVALID_ID));
      }
      return next(err);
    });
};
