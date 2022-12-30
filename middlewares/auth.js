const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');
const { UNATHORIZED_ERROR_MESSAGE_NEED_TOKEN, UNATHORIZED_ERROR_MESSAGE_NEED_AUTH } = require('../constants');

const { KEY = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError(UNATHORIZED_ERROR_MESSAGE_NEED_TOKEN));
  }
  let payload;

  try {
    payload = jwt.verify(token, KEY);
  } catch (err) {
    throw new UnauthorizedError(UNATHORIZED_ERROR_MESSAGE_NEED_AUTH);
  }
  req.user = payload;
  return next();
};
