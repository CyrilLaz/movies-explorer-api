const rateLimit = require('express-rate-limit');
const TooManyRequestError = require('../errors/TooManyRequestError');
const { tooManyRequestMessage } = require('../constants/messages').error;

module.exports = rateLimit({
  windowMs: 1 * 60 * 1000, // период подсчета ограничителя запросов
  max: 10,
  handler: (req, res, next) => next(
    new TooManyRequestError(tooManyRequestMessage),
  ),
});
