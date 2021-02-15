/* eslint-disable no-undef */
const info = (...params) => {
  if (process.env.MONGODB_URI !== 'test') {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.MONGODB_URI !== 'test') {
    console.error(...params);
  }
};

module.exports = {
  info,
  error
};