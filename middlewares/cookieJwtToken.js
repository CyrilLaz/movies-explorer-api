const jwt = require('jsonwebtoken');
const jwtKey = require('../constants/jwtKey');

module.exports = (req, res, next) => {
  res.cookieJwtToken = function (id) {
    const token = jwt.sign(
      { _id: id },
      jwtKey, // секретный код
      { expiresIn: '7d' },
    );

    return this.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    });
  };
  return next();
};
