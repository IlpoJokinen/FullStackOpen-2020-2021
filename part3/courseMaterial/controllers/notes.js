/* eslint-disable no-unused-vars */
const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

notesRouter.put('/:id', (req, res, next) => {
  const body = req.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then(updatedNote => {
      res.json(updatedNote);
    })
    .catch(error => next(error));
});

notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

notesRouter.get('/', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes);
  });
});

notesRouter.post('/', (req, res, next) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: 'content missing'
    });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });
  note
    .save()
    .then(savedNote => savedNote.toJSON())
    .then(saveAndFormattedNote => {
      res.json(saveAndFormattedNote);
    })
    .catch(error => next(error));
});

