const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const personsRouter = require('./routers/persons');
const Person = require('../models/person');
const errorHandler = require('../utils/errorHandler');

const app = express();

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());

// eslint-disable-next-line no-unused-vars
morgan.token('postData', (req, res) => {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :response-time ms :postData'));

app.use('/api/persons', personsRouter);

app.get('/', (req, res) => {
  res.send(`
    You can get all persons in the phonebook by this <a href="https://murmuring-meadow-48977.herokuapp.com/api/persons">link</a>.<br /><br />
    Information about the phonebook will be found <a href="https://murmuring-meadow-48977.herokuapp.com/info">here</a>.
    `);
});

app.get('/info', async (req, res) => {
  const today = new Date();
  const personCount = await Person.countDocuments({}).then(count => count);
  res.send(`Phonebook info has info for ${personCount} people<br /><br />${today}`);
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);


app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});