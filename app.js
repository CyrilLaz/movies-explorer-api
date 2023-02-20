const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const usersRouter = require('./routers/users');
const moviesRouter = require('./routers/movies');
const { createUser, login, logout } = require('./controllers/users');
const handleErrors = require('./middlewares/handleErrors');

const { PORT = 3000, PATH_MONGO = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(PATH_MONGO);

app.post('/signup', createUser);
app.post('/signin', login);
app.post('/signout', logout);

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.use(handleErrors);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
