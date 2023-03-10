const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  max: 15,
  windowMS: 1000,
  message: 'Слишком много запросов. Пожалуйста, попробуйте позже',
});

module.exports = limiter;
