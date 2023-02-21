const router = require('express').Router();
const { logout, login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { loginValidate, createUserValidate, tokenValidate } = require('../middlewares/validate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.post('/signup', createUserValidate, createUser);
router.post('/signin', loginValidate, login);
router.post('/signout', logout);

router.use('/users', tokenValidate, auth, usersRouter);
router.use('/movies', tokenValidate, auth, moviesRouter);

module.exports = router;
