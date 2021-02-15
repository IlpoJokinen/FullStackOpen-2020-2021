/* eslint-disable no-unused-vars */
const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/:id', async (req, res) => {
  const noteToView = await Note.findById(req.params.id);
  if (noteToView) {
    res.json(noteToView.toJSON());
  } else {
    res.status(404).end();
  }
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

notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({});
  res.json(notes.map(note => note.toJSON()));
});

notesRouter.post('/', async (req, res) => {
  const body = req.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  const savedNote = await note.save();
  res.json(savedNote.toJSON());
});

module.exports = notesRouter;