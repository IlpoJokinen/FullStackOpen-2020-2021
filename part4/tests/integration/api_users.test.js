const mongoose = require('mongoose');
const app = require('../../app');
const supertest = require('supertest');
const api = supertest(app);
const User = require('../../models/user');
const initialUsers = require('../data/userData');
const usersInDb = require('./test_helper').usersInDb;
const createHashPasswords = require('./test_helper').createHashPasswords;

describe('When there are users in the database', () => {
  beforeAll(async () => {
    await User.deleteMany({});
    const usersWithHashedPasswords = await createHashPasswords(initialUsers);
    await User.insertMany(usersWithHashedPasswords);
  });

  describe('Saving a user object to MongoDB', () => {
    test('Username should be 3-40 characters long', async () => {
      const usersInStart = await usersInDb();
      const testUsers = [
        {
          username: 'Te',
          password: 'password',
          name: 'Testing User'
        },
        {
          username: 'Test',
          password: 'password',
          name: 'Testing User'
        },
        {
          username: 'TestUsernameThatHasSoLongUsernameTHatItBreaksTheMongooseSchemaRules',
          password: 'password',
          name: 'Testing User'
        }
      ];
      let request, errorMsg, expectedMsg;
      // Too short username
      request = await api
        .post('/api/users')
        .send(testUsers[0])
        .expect(400);

      errorMsg = JSON.parse(request.text).message;
      expectedMsg = `User validation failed: username: Path \`username\` (\`${testUsers[0].username}\`) is shorter than the minimum allowed length (3).`;
      expect(errorMsg).toEqual(expectedMsg);

      // Too long username
      request = await api
        .post('/api/users')
        .send(testUsers[2])
        .expect(400);

      errorMsg = JSON.parse(request.text).message;
      expectedMsg = `User validation failed: username: Path \`username\` (\`${testUsers[2].username}\`) is longer than the maximum allowed length (40).`;
      expect(errorMsg).toEqual(expectedMsg);

      // Username with correct length
      request = await api
        .post('/api/users')
        .send(testUsers[1])
        .expect(200);

      const usersAtEnd = await usersInDb();
      expect(usersAtEnd).toHaveLength(usersInStart.length + 1);
    });

    test('Send proper error message if some of the request fields are null', async () => {
      const testUsers = [
        {
          password: 'password',
          name: 'Testing User'
        },
        {
          username: 'Test',
          name: 'Testing User'
        },
        {
          username: 'Test',
          password: 'password',
        }
      ];
      let request, errorMsg, expectedMsg;
      // Username is mising
      request = await api
        .post('/api/users')
        .send(testUsers[0])
        .expect(400);

      errorMsg = JSON.parse(request.text).message;
      expectedMsg = 'User validation failed: username: Path `username` is required.';
      expect(errorMsg).toEqual(expectedMsg);
      // Password is mising

      request = await api
        .post('/api/users')
        .send(testUsers[1])
        .expect(400);

      errorMsg = JSON.parse(request.text).message;
      expectedMsg = 'Password must be at least 3 characters long!';
      expect(errorMsg).toEqual(expectedMsg);
      // Name is mising

      request = await api
        .post('/api/users')
        .send(testUsers[2])
        .expect(400);

      errorMsg = JSON.parse(request.text).message;
      expectedMsg = 'User validation failed: name: Path `name` is required.';
      expect(errorMsg).toEqual(expectedMsg);
    });
  });

  describe('Fetching the users to the server', () => {
    test('Get request should output all user as json', async () => {
      const users = await usersInDb();
      const request = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(request.body).toHaveLength(users.length);
      expect(request.body).toEqual(users);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});