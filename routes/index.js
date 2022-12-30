const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createUser, login, logout } = require('../controllers/users');
const { registrationValidation, loginValidation } = require('../utils/loginValidation');
const { NOT_FOUND_MESSAGE_PAGE } = require('../constants');

const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.post('/signup', celebrate(registrationValidation), createUser);
router.post('/signin', celebrate(loginValidation), login);
router.use(auth);
router.use('/users', users);
router.use('/movies', movies);
router.post('/signout', logout);

router.all('/*', (req, res, next) => next(new NotFoundError(NOT_FOUND_MESSAGE_PAGE)));

module.exports = router;
