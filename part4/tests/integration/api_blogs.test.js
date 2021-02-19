const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);
const Blog = require('../../models/blog');
const initialBlogs = require('../data/blogData').blogs;
const blogsInDb = require('./test_helper').blogsInDb;

describe('When there is initially some blog data available', () => {
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

  test('blog objects have right parameters', async () => {
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

  describe('Adding a blog to the database', () => {
    test('Adding a blog to the database is succesful', async () => {
      let newBlogObject = {
        title: 'Amazing weather',
        author: 'Pekka Pouta',
        url: 'http://pekansää.fi',
        likes: 200
      };
      await api
        .post('/api/blogs')
        .send(newBlogObject)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const { body } = await api.get('/api/blogs');
      const titlesOfResponse = body.map(blog => blog.title);

      const blogsInDbAfterPost = await blogsInDb();
      expect(blogsInDbAfterPost).toHaveLength(initialBlogs.length + 1);
      expect(titlesOfResponse).toContain('Amazing weather');
    });

    test('Too short title will cause an error', async () => {
      let newBlogObject = {
        title: 'LOL',
        author: 'Pekka Pouta',
        url: 'http://pekansää.fi',
        likes: 200
      };
      const request = await api
        .post('/api/blogs')
        .send(newBlogObject);

      expect(request.status).toBe(409);
      const errorMsg = JSON.parse(request.text);
      expect(errorMsg.message).toEqual('Parameter title should be at least 5 characters long');
    });

    test('If title is missing, should correspond with proper error message and status code', async () => {
      let newBlogObject = {
        author: 'Pekka Pouta',
        url: 'http://pekansää.fi',
        likes: 200
      };
      const request = await api
        .post('/api/blogs')
        .send(newBlogObject)
        .expect(400);

      expect(JSON.parse(request.text).message).toEqual('Blog validation failed: title: Path `title` is required.');
    });

    test('If url is missing, should correspond with proper error message and status code', async () => {
      let newBlogObject = {
        title: 'Uusi säätiedoite',
        author: 'Pekka Pouta',
        likes: 200
      };
      const request = await api
        .post('/api/blogs')
        .send(newBlogObject)
        .expect(400);

      expect(JSON.parse(request.text).message).toEqual('Blog validation failed: url: Path `url` is required.');
    });

    test('Duplicate title can not be added to the database', async () => {
      const blogsAtStart = await blogsInDb();
      const titlesAtStart = blogsAtStart.map(blog => blog.title);
      let newBlogObject = {
        title: titlesAtStart[Math.floor(Math.random() * titlesAtStart.length)],
        author: 'Ilpo Jokinen',
        url: 'http://ilposite.org/blogs',
        likes: 0
      };
      const request = await api
        .post('/api/blogs')
        .send(newBlogObject)
        .expect(400);

      expect(JSON.parse(request.text).message).toEqual('Blog validation failed: title: A blog with the same title is already in the database');
    });
  });
  describe('A blog document can be deleted', () => {
    test('Deleting a blog from the database is succesfull', async () => {
      const blogsAtStart = await blogsInDb();
      await api
        .delete(`/api/blogs/${blogsAtStart[0].id}`)
        .expect(204);

      const blogsAfterTheDeletion = await blogsInDb();
      expect(blogsAfterTheDeletion).toHaveLength(initialBlogs.length - 1);
      expect(blogsAfterTheDeletion).not.toContain(blogsAtStart[0]);
    });

    test('Deleting an non existing blog causes 400 status invalid id', async () => {
      const id = '21212ab65trZqYF5671222';
      const request = await api
        .delete(`/api/blogs/${id}`)
        .expect(400);
      const blogsAtEnd = await blogsInDb();
      expect(blogsAtEnd).toHaveLength(initialBlogs.length);
      const errorMsg = JSON.parse(request.text).message;
      expect(errorMsg).toEqual('invalid id');
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});