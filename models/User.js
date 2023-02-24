const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/Unauthorized');
const { incorrectEmailMessage, incorrectLoginDataMessage } = require('../constants/messages').error;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v) {
          return isEmail(v);
        },
        message: incorrectEmailMessage,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false },
);

userSchema.statics = {
  findUserByCredentials(email, password) {
  // попытаемся найти пользователя по почте
    return this.findOne({ email })
      .select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(
            new UnauthorizedError(incorrectLoginDataMessage),
          );
        }

        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            return Promise.reject(
              new UnauthorizedError(incorrectLoginDataMessage),
            );
          }
          return user.toObject();
        });
      });
  },
};

module.exports = model('user', userSchema);
