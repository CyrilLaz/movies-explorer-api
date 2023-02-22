/* eslint-disable no-unused-vars */
const { isCelebrateError } = require('celebrate');
const NoExistError = require('../errors/NoExistError');
const NoRightError = require('../errors/NoRightError');
const TooManyRequestError = require('../errors/TooManyRequestError');
const UnAuthError = require('../errors/UnAuthError');
const UncorrectLoginError = require('../errors/UncorrectLoginError');
const DublicateError = require('../errors/DublicateError');
const {
  defaultErrorStatus,
  unUniqueStatus,
  dataErrorStatus,
} = require('../constants/errorStatuses');
const {
  nonUniqueEmailMessage, incorrectIdMessage, incorrectDataMessage, defaultErrorMessage,
} = require('../constants/messages').error;

module.exports = (err, req, res, next) => {
  const { statusCode = defaultErrorStatus, message } = err;
  if (
    err instanceof NoExistError
    || err instanceof UncorrectLoginError
    || err instanceof NoRightError
    || err instanceof UnAuthError
    || err instanceof UnAuthError
    || err instanceof TooManyRequestError
    || err instanceof DublicateError
  ) {
    return res.status(statusCode).send({ data: { message } });
  }

  if (isCelebrateError(err)) {
    const error = err.details.get('body')
      || err.details.get('cookies')
      || err.details.get('params');
    const {
      details: [errorDetails],
    } = error;
    return res
      .status(dataErrorStatus)
      .send({ data: { message: errorDetails.message } });
  }

  if (err.code === 11000) {
    return res.status(unUniqueStatus).send({
      data: { message: nonUniqueEmailMessage },
    });
  }

  if (err.name === 'CastError') {
    return res
      .status(dataErrorStatus)
      .send({ data: { message: incorrectIdMessage } });
  }

  if (err.name === 'ValidationError') {
    return res.status(dataErrorStatus).send({
      data: { message: incorrectDataMessage },
    });
  }
  return res
    .status(statusCode)
    .send({ data: { message: defaultErrorMessage } });
};
