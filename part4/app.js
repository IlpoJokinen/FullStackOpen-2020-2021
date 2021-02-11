/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');

const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blogs');

const app = express();

logger.info('Connecting to ', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    logger.info('Connected to MongoDB');
  })
  .catch(error => {
    logger.error('Error connecting to MongoDB', error.message);
  });

app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;