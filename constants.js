const REGEXP_EMAIL = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
const REGEXP_URL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'*+,;=.]+$/;
const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNATHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND = 404;
const CONFLICT_ERROR = 409;
const SERVER_ERROR = 500;

const BAD_REQUEST_MESSAGE_INVALID_DATA = 'Переданы некорректные данные';
const BAD_REQUEST_MESSAGE_INVALID_ID = 'Передан невалидный id';
const UNATHORIZED_ERROR_MESSAGE = 'Неправильные почта или пароль';
const UNATHORIZED_ERROR_MESSAGE_NEED_TOKEN = 'Токен не передан';
const UNATHORIZED_ERROR_MESSAGE_NEED_AUTH = 'Необходима авторизация';
const FORBIDDEN_ERROR_MESSAGE = 'Недостаточно прав для удаления фильма';
const NOT_FOUND_MESSAGE_MOVIE = 'Фильм не найден';
const NOT_FOUND_MESSAGE_USER = 'Пользователь не найден';
const NOT_FOUND_MESSAGE_PAGE = 'Страница не найдена';
const CONFLICT_ERROR_MESSAGE = 'Этот email уже существует';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';

module.exports = {
  REGEXP_EMAIL,
  REGEXP_URL,
  OK,
  CREATED,
  BAD_REQUEST,
  UNATHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND,
  CONFLICT_ERROR,
  SERVER_ERROR,
  BAD_REQUEST_MESSAGE_INVALID_DATA,
  BAD_REQUEST_MESSAGE_INVALID_ID,
  UNATHORIZED_ERROR_MESSAGE,
  UNATHORIZED_ERROR_MESSAGE_NEED_TOKEN,
  UNATHORIZED_ERROR_MESSAGE_NEED_AUTH,
  FORBIDDEN_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE_MOVIE,
  NOT_FOUND_MESSAGE_USER,
  NOT_FOUND_MESSAGE_PAGE,
  CONFLICT_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
};
