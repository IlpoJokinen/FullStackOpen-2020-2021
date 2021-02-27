const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

describe('loggin in', () => {
  test('if username or password incorrect response with proper statuscode and error message', async () => {
    const loginRequest = await api
      .post('/api/login')
      .send({
        username: 'mluukkai',
        password: 'wrong password'
      })
      .expect(401)
      .expect('Content-Type', /application\/json/);
    expect(JSON.parse(loginRequest.text).error).toEqual('invalid username or password');
  });

  test('if username or password missing response with proper statuscode and error message', async () => {
    const loginRequest = await api
      .post('/api/login')
      .send({
        password: 'wrong password'
      })
      .expect(401)
      .expect('Content-Type', /application\/json/);
    expect(JSON.parse(loginRequest.text).error).toEqual('invalid username or password');
  });

  test('valid user credentials will response with the user\'s information and token', async () => {
    const loginRequest = await api
      .post('/api/login')
      .send({
        username: 'mluukkai',
        password: 'salainen'
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const requestBody = JSON.parse(loginRequest.text);
    expect(requestBody).toHaveProperty('token');
    expect(requestBody).toHaveProperty('username');
    expect(requestBody).toHaveProperty('name');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
