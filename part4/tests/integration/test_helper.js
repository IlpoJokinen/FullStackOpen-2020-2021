/* eslint-disable no-unused-vars */
const Blog = require('../../models/blog');
const User = require('../../models/user');
const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);
const bcrypt = require('bcrypt');

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const latestBlogInDb = async () => await Blog.find().sort({ _id: -1 }).limit(1);


const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

const getTokenFromLogIn = async () => {
  const loginRequest = await api
    .post('/api/login')
    .send({
      username: 'Masa',
      password: 'bernaise'
    })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const { body } = loginRequest;
  const token = body.token;

  return token;
};

const hashUserPassword = async user => {
  const saltRounds = 10;
  user.passwordHash = await bcrypt.hash(user.password, saltRounds);
  delete user.password;
  return user;
};

const createHashPasswords = async (initialUsers) => {
  return Promise.all(initialUsers.map(user => hashUserPassword(user)));
};

module.exports = {
  blogsInDb,
  usersInDb,
  latestBlogInDb,
  getTokenFromLogIn,
  createHashPasswords
};