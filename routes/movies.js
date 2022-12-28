const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createMovieValidation, paramsValidation } = require('../utils/movieValidation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate(createMovieValidation), createMovie);

router.delete('/:_id', celebrate(paramsValidation), deleteMovie);

module.exports = router;
