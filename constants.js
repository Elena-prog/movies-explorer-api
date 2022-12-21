const REGEXP_EMAIL = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
const REGEXP_URL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'*+,;=.]+$/;

module.exports = {
  REGEXP_EMAIL,
  REGEXP_URL
};
