const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtKey = require('../constants/jwtKey');
const NoExistError = require('../errors/NoExistError');
const { userNotFoundMessage } = require('../constants/messages').error;
const { logoutMessage } = require('../constants/messages').report;

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  User.init()
    .then(() => bcrypt.hash(password, 10))
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => user.toObject())
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        jwtKey, // секретный код
        { expiresIn: '7d' },
      );
      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ data: { ...user, password: undefined } });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        jwtKey, // секретный код
        { expiresIn: '7d' },
      );
      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ data: { ...user, password: undefined } });
    })
    .catch(next);
};

const logout = (req, res) => {
  const { jwt: token } = req.cookies;
  res
    .cookie('jwt', token, {
      maxAge: 0,
    })
    .send({ data: { message: logoutMessage } });
};

const getUserData = (req, res, next) => {
  const userId = req.user;
  User.findById(userId)
    .then((user) => {
      if (!user) throw new NoExistError(userNotFoundMessage);
      res.send({ data: user });
    })
    .catch(next);
};

const updateUserData = (req, res, next) => {
  const userId = req.user;
  const updData = req.body;
  User.findByIdAndUpdate(
    userId,
    { ...updData },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (!user) throw new NoExistError(userNotFoundMessage);
      res.send({ data: user });
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  logout,
  getUserData,
  updateUserData,
};
