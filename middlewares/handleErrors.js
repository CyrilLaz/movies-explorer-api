/* eslint-disable no-unused-vars */
const NoExistError = require('../errors/NoExistError');
const NoRightError = require('../errors/NoRightError');
const TooManyRequestError = require('../errors/TooManyRequestError');
const UnAuthError = require('../errors/UnAuthError');
const UncorrectLoginError = require('../errors/UncorrectLoginError');
const { defaultErrorStatus, unUniqueStatus, dataErrorStatus } = require('../constants/errorStatuses');

module.exports = (err, req, res, next) => {
  const { statusCode = defaultErrorStatus, message } = err;
  if (
    err instanceof NoExistError
    || err instanceof UncorrectLoginError
    || err instanceof NoRightError
    || err instanceof UnAuthError
    || err instanceof UnAuthError
    || err instanceof TooManyRequestError
  ) {
    return res.status(statusCode).send({ data: { message } });
  }
  if (err.code === 11000) {
    return res
      .status(unUniqueStatus)
      .send({ message: 'Пользователь с таким email уже зарегистрирован' });
  }

  if (err.name === 'CastError') {
    return res
      .status(dataErrorStatus)
      .send({ message: 'Передан некорректный _id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(dataErrorStatus).send({
      message: 'Переданы некорректные данные.',
    });
  }
  return res
    .status(statusCode)
    .send({ message: 'На сервере произошла ошибка' });
};
