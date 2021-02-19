const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);
const Blog = require('../../models/blog');
const initialBlogs = require('../data/blogData').blogs;

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
});

test('blog objects are the right type', async () => {
  const { body } = await api.get('/api/blogs');
  let isCorrectType = true;
  const validKeyProperties = ['id', 'title', 'author', 'url', 'likes'];
  let result = body.every((blog) => {
    let blogKeys = Object.keys(blog);
    if (validKeyProperties.sort().join(',') === blogKeys.sort().join(',')) {
      isCorrectType = true;
    } else {
      return false;
    }
    return isCorrectType;
  });
  expect(result).toBeTruthy();
});

test('The identificators of the objects are called id', async () => {
  const { body } = await api.get('/api/blogs');
  body.every(blog => {
    expect(blog.id).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});