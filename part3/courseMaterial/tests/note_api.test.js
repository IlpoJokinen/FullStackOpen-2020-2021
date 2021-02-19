const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const Note = require('../models/note');

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Note.deleteMany({});

    const noteObjects = helper.initialNotes
      .map(note => new Note(note));
    const promiseArray = noteObjects.map(note => note.save());
    await Promise.all(promiseArray);
  });

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const { body } = await api.get('/api/notes');
    expect(body).toHaveLength(helper.initialNotes.length);
  });


  test('a specific note is within the returned notes', async () => {
    const { body } = await api.get('/api/notes');
    const contents = body.map(res => res.content);
    expect(contents).toContain(
      'Browser can execute only Javascript'
    );
  });

  describe('viewing a specific note', () => {
    test('success with a valid id', async () => {
      const notesAtStart = await helper.notesInDb();

      const noteToView = notesAtStart[0];

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const processedNoteToView = JSON.parse(JSON.stringify(noteToView));

      expect(resultNote.body).toEqual(processedNoteToView);
    });
    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a2ff3tot13330003';

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400);
    });
  });
  describe('addition of a new note', () => {
    test('a valid note can be added', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
      };

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const notesAtEnd = await helper.notesInDb();
      expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

      const contents = notesAtEnd.map(note => note.content);

      expect(contents).toContain(
        'async/await simplifies making async calls'
      );
    });
    test('fails with status code 400 if data invalid', async () => {
      const newNote = {
        important: true
      };

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400);

      const notesAtEnd = await helper.notesInDb();
      expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
    });
  });
  describe('deletion of note', () => {
    test('a note can be deleted', async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToRemove = notesAtStart[1];

      await api
        .delete(`/api/notes/${noteToRemove.id}`)
        .expect(204);

      const notesAtEnd = await helper.notesInDb();
      expect(notesAtEnd).toHaveLength(notesAtStart.length - 1);
      expect(notesAtEnd).not.toContainEqual(noteToRemove);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
