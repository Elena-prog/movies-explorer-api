require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rate-limiter');
const DEV_ADRESS_DB = require('./config');

const PORT = process.env.PORT || 3001;
const ADRESS_DB = process.env.ADRESS_DB || DEV_ADRESS_DB;

const app = express();

const options = {
  origin: [
    'https://diploma.elena.nomoredomains.club',
    'http://diploma.elena.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

mongoose.connect(ADRESS_DB, {
  autoIndex: true,
});

app.use(helmet());
app.use('*', cors(options));
app.use(requestLogger);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);
