const { Schema, model } = require('mongoose');
const { isURL } = require('validator');
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
          return isURL(v);
        },
        message: incorrectUrlMessage,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return isURL(v);
        },
        message: incorrectUrlMessage,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return isURL(v);
        },
        message: incorrectUrlMessage,
      },
    },
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    id: { type: Number, required: true },
    nameRU: { type: String, required: true },
    nameEN: { type: String, required: true },
  },
  { versionKey: false },
);

movieSchema.statics = {
  isDublicate(userId, movieId) {
    return this.findOne({ owner: userId, id: movieId }).then((movie) => !!movie);
  },
  isOwned(userId, id) {
    return this.findById(id).then((movie) => {
      if (!movie) throw new NoExistError(movieNotFoundMessage);
      return movie.owner._id.toString() === userId._id;
    });
  },
};

module.exports = model('movie', movieSchema);
