const { SERVER_ERROR_MESSAGE } = require('../constants');

const handleError = (err, req, res, next) => {
  if (err) {
    const { statusCode = 500, message } = err;
    return res
      .status(statusCode)
      .send({ message: statusCode === 500 ? SERVER_ERROR_MESSAGE : message });
  }
  return next();
};

module.exports = handleError;
