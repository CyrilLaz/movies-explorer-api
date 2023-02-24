const jwt = require('jsonwebtoken');
const jwtKey = require('../constants/jwtKey');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { requiredLoginMessage } = require('../constants/messages').error;

module.exports = async (req, res, next) => {
  const { cookies } = req;

  let payload;
  try {
    if (!cookies || !cookies.jwt) return next(new UnauthorizedError(requiredLoginMessage));

    const { jwt: token } = cookies;
    payload = jwt.verify(token, jwtKey); // секретный код
  } catch (error) {
    return next(new UnauthorizedError(requiredLoginMessage));
  }
  req.user = payload;

  return next();
};
