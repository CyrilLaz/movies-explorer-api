const DublicateError = require('../errors/DublicateError');
const NoRightError = require('../errors/NoRightError');
const Movie = require('../models/Movie');

const getMovies = (req, res, next) => {
  const userId = req.user;
  Movie.find({ owner: userId })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const userId = req.user;
  const { movieId, ...data } = req.body;
  Movie.isDublicate(userId, movieId)
    .then((isDubl) => {
      if (isDubl) {
        throw new DublicateError('Такая карточка уже есть у пользователя');
      }
      return Movie.create({ ...data, movieId, owner: userId });
    })
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};

const removeMovie = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user;
  Movie.isOwned(userId, id).then((isOwned) => {
    if (!isOwned) {
      throw new NoRightError('Удалить фильм из коллекции может только владелец коллекции');
    }
    return Movie.findByIdAndRemove(id).then(() => {
      res.send({ data: { message: 'Фильм удален из коллекции' } });
    });
  }).catch(next);
};

module.exports = { getMovies, addMovie, removeMovie };
