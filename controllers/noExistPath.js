const NoExistError = require('../errors/NoExistError');
const { incorrectPathMessage } = require('../constants/messages').error;

module.exports = (req, res, next) => next(new NoExistError(incorrectPathMessage));
