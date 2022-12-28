const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized');
const { OK, CREATED } = require('../constants');

const { NODE_ENV, KEY } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      throw new Error('Не удалось захешировать пароль');
    }
    User.create({
      email,
      password: hash,
      name,
    })
      .then((userData) => {
        const data = userData.toObject();
        delete data.password;
        res.status(CREATED).send(data);
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          return next(new BadRequestError('Переданы некорректные данные'));
        }
        if (error.code === 11000) {
          return next(new ConflictError('Этот email уже существует'));
        }
        return next(error);
      });
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((userData) => {
      if (!userData) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, userData.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          const token = jwt.sign(
            { _id: userData._id },
            NODE_ENV === 'production' ? KEY : 'dev-secret',
            { expiresIn: '7d' },
          );
          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            secure: NODE_ENV === 'production',
          });
          const loggedUser = userData.toObject();
          delete loggedUser.password;
          res.status(OK).send(loggedUser);
        });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: NODE_ENV === 'production',
    });
    res.status(OK).send({ message: 'Пользователь вышел из приложения' });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((userData) => res.status(OK).send(userData))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Пользователь не найден'));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      email,
      name,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((userData) => res.status(OK).send(userData))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Пользователь не найден'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};
