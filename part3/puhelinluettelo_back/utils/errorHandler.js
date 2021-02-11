const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    const errPath = Object.values(err.errors).map(el => el.path);
    if (errPath.includes('name')) {
      return res.status(409).send({ error: 'Name is shorter than the minimun allowed length (3).' });
    } else if (errPath.includes('number')) {
      return res.status(409).send({ error: 'Number is shorter than the minimun allowed length (8).' });
    }
  }
  next(err);
};
module.exports = errorHandler;