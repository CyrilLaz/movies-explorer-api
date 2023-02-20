const router = require('express').Router();
const { getMovies, addMovie, removeMovie } = require('../controllers/movies');
const { addMovieValidate, idValidate } = require('../middlewares/validate');

router.get('/', getMovies);
router.post('/', addMovieValidate, addMovie);
router.delete('/:id', idValidate, removeMovie);

module.exports = router;
