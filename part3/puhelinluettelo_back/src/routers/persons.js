/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');

const Person = require('../../models/person');

const router = express.Router();
const app = express();

router.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

router.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

router.put('/:id', (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(error => next(error));
});

router.post('/', (req, res, next) => {
  const body = req.body;

  if (!body.number || !body.name) {
    return res.status(400).json({
      error: 'Please insert both values for person!'
    });
  }
  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });
  newPerson
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => res.json(savedAndFormattedPerson))
    .catch(error => next(error));
});

router.get('/', (req, res) => {
  Person.find({})
    .then(persons => res.send(persons));
});

app.use((err, req, res, next) => {
  console.log('congrats you hit the error middleware');
  console.log(err);
});

module.exports = router;