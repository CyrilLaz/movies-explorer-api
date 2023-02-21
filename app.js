const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { PATH_MONGO, PORT } = require('./constants/сonnectSettings');

const handleErrors = require('./middlewares/handleErrors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const apiRequestLimiter = require('./middlewares/apiRequestLimiter');
const cors = require('./middlewares/cors');
const routers = require('./routers');

const app = express();

app.use(apiRequestLimiter);
app.use(helmet());
app.use(cors);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', true);
mongoose.connect(PATH_MONGO);

app.use(requestLogger);
app.use(routers);
app.use(errorLogger);
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
