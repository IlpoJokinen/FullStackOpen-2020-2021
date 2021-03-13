/* eslint-disable no-undef */
const logger = require('./logger');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');

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
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({ message: 'invalid signature' });
  } else {
    next(error);
  }
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  request.token = null;
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const { id } = jwt.verify(request.token, process.env.SECRET);
  request.user = id;
  if (request.params.id) {
    const blog = await Blog.findById(request.params.id);
    if (blog.user && blog.user.toString() === id.toString()) {
      request.user = blog.user.toString();
    }
  }
  next();
};

module.exports = {
  unknownEndpoint,
  requestLogger,
  errorHandler,
  tokenExtractor,
  userExtractor
};