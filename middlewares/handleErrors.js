const { isCelebrateError } = require('celebrate');
const NoExistError = require('../errors/NoExistError');
const NoRightError = require('../errors/NoRightError');
const TooManyRequestError = require('../errors/TooManyRequestError');
const UnauthorizedError = require('../errors/Unauthorized');
const DublicateError = require('../errors/DublicateError');
const {
  defaultErrorStatus,
  unUniqueStatus,
  dataErrorStatus,
} = require('../constants/errorStatuses');
const {
  nonUniqueEmailMessage, incorrectIdMessage, incorrectDataMessage, defaultErrorMessage,
} = require('../constants/messages').error;

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const { statusCode = defaultErrorStatus, message } = err;
  if (
    err instanceof NoExistError
    || err instanceof UnauthorizedError
    || err instanceof NoRightError
    || err instanceof TooManyRequestError
    || err instanceof DublicateError
  ) {
    return res.status(statusCode).send({ message });
  }

  if (isCelebrateError(err)) {
    const error = err.details.get('body')
      || err.details.get('params');
    const {
      details: [errorDetails],
    } = error;
    return res
      .status(dataErrorStatus)
      .send({ message: errorDetails.message });
  }

  if (err.code === 11000) {
    return res.status(unUniqueStatus).send({
      message: nonUniqueEmailMessage,
    });
  }

  if (err.name === 'CastError') {
    return res
      .status(dataErrorStatus)
      .send({ message: incorrectIdMessage });
  }

  if (err.name === 'ValidationError') {
    return res.status(dataErrorStatus).send({
      message: incorrectDataMessage,
    });
  }
  return res
    .status(statusCode)
    .send({ message: defaultErrorMessage });
};
