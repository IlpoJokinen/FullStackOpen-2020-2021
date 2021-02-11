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

module.exports = {
    unknownEndpoint,
    requestLogger
}