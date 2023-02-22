/* eslint-disable no-useless-escape */
const { Schema, model } = require('mongoose');
const NoExistError = require('../errors/NoExistError');
const { incorrectUrlMessage, movieNotFoundMessage } = require('../constants/messages').error;

const movieSchema = Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          const regex = /^https?:\/\/([\w\-]+\.)+[a-z]{2,}(\/[\w#\-\.~:\[\]@!\$&'\(\)\*\+,;=,]*)*$/i;
          return regex.test(v);
        },
        message: incorrectUrlMessage,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          const regex = /^https?:\/\/([\w\-]+\.)+[a-z]{2,}(\/[\w#\-\.~:\[\]@!\$&'\(\)\*\+,;=,]*)*$/i;
          return regex.test(v);
        },
        message: incorrectUrlMessage,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          const regex = /^https?:\/\/([\w\-]+\.)+[a-z]{2,}(\/[\w#\-\.~:\[\]@!\$&'\(\)\*\+,;=,]*)*$/i;
          return regex.test(v);
        },
        message: incorrectUrlMessage,
      },
    },
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    movieId: { type: String, required: true }, // откуда получают это поле id???
    nameRU: { type: String, required: true }, // валидация русских букв isAlphanumeric
    nameEN: { type: String, required: true }, // валидация англ букв
  },
  { versionKey: false },
);

movieSchema.statics.isDublicate = function (userId, movieId) {
  return this.findOne({ owner: userId, movieId }).then((movie) => !!movie);
};

movieSchema.statics.isOwned = function (userId, id) {
  return this.findById(id).then((movie) => {
    if (!movie) throw new NoExistError(movieNotFoundMessage);
    return movie.owner._id.toString() === userId._id;
  });
};

module.exports = model('movie', movieSchema);
