const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const usersRouter = require('./routers/users');
const moviesRouter = require('./routers/movies');
const { createUser, login, logout } = require('./controllers/users');
const handleErrors = require('./middlewares/handleErrors');
const auth = require('./middlewares/auth');
const {
  loginValidate,
  createUserValidate,
  tokenValidate,
} = require('./middlewares/validate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const apiRequestLimiter = require('./middlewares/apiRequestLimiter');
const cors = require('./middlewares/cors');

const { PORT = 3000, PATH_MONGO = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(apiRequestLimiter);
app.use(cors);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(PATH_MONGO);

app.use(requestLogger);
app.post('/signup', createUserValidate, createUser);
app.post('/signin', loginValidate, login);
app.post('/signout', logout);

app.use('/users', tokenValidate, auth, usersRouter);
app.use('/movies', tokenValidate, auth, moviesRouter);

app.use(errorLogger);
app.use(handleErrors);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
