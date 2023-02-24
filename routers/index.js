const router = require('express').Router();
const { logout, login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  loginValidate,
  createUserValidate,
} = require('../middlewares/validate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const noExistPath = require('../controllers/noExistPath');

router.post('/signup', createUserValidate, createUser);
router.post('/signin', loginValidate, login);
router.post('/signout', auth, logout);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('/*', auth, noExistPath);

module.exports = router;
