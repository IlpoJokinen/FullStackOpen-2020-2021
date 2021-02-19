const logger = require('./logger');

const unknownEndpoint = (req, res) => {
  res.status(400).send({ error: 'unknown endpoint' });
};

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const errorHandler = (error, request, response, next) => {
  const errPaths = error.errors ? Object.values(error.errors).map(el => el.path) : null;

  if (error.name === 'CastError') {
    return response.status(400).send({ message: 'invalid id' });
  }
  if (error.name === 'ValidationError' && request.body.title && request.body.title.length < 5) {
    return response.status(409).send({ message: 'Parameter title should be at least 5 characters long' });
  } else if (error.name === 'ValidationError' && errPaths) {
    return response.status(400).send({ message: error.message });
  } else {
    next(error);
  }
};

module.exports = {
  unknownEndpoint,
  requestLogger,
  errorHandler
};