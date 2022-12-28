const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const { OK, CREATED } = require('../constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((moviesData) => res.status(OK).send(moviesData))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((moviesData) => res.status(CREATED).send(moviesData))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movieData) => {
      if (req.user._id === movieData.owner.toString()) {
        movieData.remove()
          .then((deletedMovie) => res.status(OK).send(deletedMovie));
      } else {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Фильм не найден'));
      }
      return next(err);
    });
};
