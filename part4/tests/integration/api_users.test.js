const mongoose = require('mongoose');
const app = require('../../app');
const supertest = require('supertest');
const api = supertest(app);
const User = require('../../models/user');
const initialUsers = require('../data/userData');
const usersInDb = require('./test_helper').usersInDb;

describe('When there are users in the database', () => {
  beforeAll(async () => {
    await User.deleteMany({});
    await User.insertMany(initialUsers);
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
  });
});

afterAll(() => {
  mongoose.connection.close();
});