/* eslint-disable no-undef */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);
const Blog = require('../../models/blog');
const initialBlogs = require('../data/blogData').blogs;
const blogsInDb = require('./test_helper').blogsInDb;
const latestBlogInDb = require('./test_helper').latestBlogInDb;
const getTokenFromLogIn = require('./test_helper').getTokenFromLogIn;
const jwt = require('jsonwebtoken');

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
      const token = await getTokenFromLogIn();
      const newBlogObject = {
        title: 'Masan soossi',
        author: 'MVP',
        url: 'http://soossikuningas.fi',
        likes: 200
      };

      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newBlogObject)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsInDbAfterPost = await blogsInDb();
      const [latestBlogPosted] = await latestBlogInDb();
      const titlesOfResponse = blogsInDbAfterPost.map(blog => blog.title);

      expect(blogsInDbAfterPost).toHaveLength(initialBlogs.length + 1);
      expect(titlesOfResponse).toContain('Masan soossi');
      expect(latestBlogPosted).toHaveProperty('user');
    });

    test('Too short title will cause an error', async () => {
      const token = await getTokenFromLogIn();

      let newBlogObject = {
        title: 'LOL',
        author: 'Matti',
        url: 'http://masansivut.fi',
        likes: 200
      };

      const request = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newBlogObject);

      expect(request.status).toBe(409);
      const errorMsg = JSON.parse(request.text);
      expect(errorMsg.message).toEqual('Parameter title should be at least 5 characters long');
    });

    test('If title is missing, should correspond with proper error message and status code', async () => {
      const token = await getTokenFromLogIn();

      let newBlogObject = {
        author: 'Pekka Pouta',
        url: 'http://pekansää.fi',
        likes: 200
      };
      const request = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newBlogObject)
        .expect(400);

      expect(JSON.parse(request.text).message).toEqual('Blog validation failed: title: Path `title` is required.');
    });

    test('If url is missing, should correspond with proper error message and status code', async () => {
      const token = await getTokenFromLogIn();

      let newBlogObject = {
        title: 'Uusi säätiedoite',
        author: 'Pekka Pouta',
        likes: 200
      };
      const request = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
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

      const token = await getTokenFromLogIn();

      const request = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newBlogObject)
        .expect(400);

      expect(JSON.parse(request.text).message).toEqual('Blog validation failed: title: A blog with the same title is already in the database');
    });

    test('Addition of a blog without proper token will correspond with 401 and correct error message', async () => {
      const newBlogObject = {
        title: 'Masan soossi',
        author: 'MVP',
        url: 'http://soossikuningas.fi',
        likes: 200
      };

      const request = await api
        .post('/api/blogs')
        .send(newBlogObject)
        .expect(401);

      expect(JSON.parse(request.text).message).toEqual('invalid signature');
    });
  });
  describe('A blog document can be deleted', () => {
    test('User can delete users own posts', async () => {
      const token = await getTokenFromLogIn();

      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send({
          title: 'Masan blogi',
          author: 'Masa',
          url: 'http://www.masaruokkii.com',
          likes: 0
        })
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsInDatabase = await blogsInDb();
      const blogToRemove = blogsInDatabase[blogsInDatabase.length - 1];
      console.log('BLOG', blogToRemove);
      await api
        .delete(`/api/blogs/${blogToRemove.id}`)
        .set('Authorization', 'bearer ' + token)
        .expect(204);

      const blogsAfterTheDeletion = await blogsInDb();
      expect(blogsAfterTheDeletion).toHaveLength(blogsInDatabase.length - 1);
      expect(blogsAfterTheDeletion).not.toContain(blogToRemove);
    });

    test('Deleting an non existing blog causes 400 status invalid id', async () => {
      const token = await getTokenFromLogIn();

      const id = '21212ab65trZqYF5671222';
      const request = await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', 'bearer ' + token)
        .expect(400);
      const blogsAtEnd = await blogsInDb();
      expect(blogsAtEnd).toHaveLength(initialBlogs.length);
      const errorMsg = JSON.parse(request.text).message;
      expect(errorMsg).toEqual('invalid id');
    });
  });
  describe('A blog can be updated', () => {
    test('Updating the blog document is succesful', async () => {
      const blogsAtStart = await blogsInDb();
      let blogToUpdate = blogsAtStart[0];
      blogToUpdate.likes += 1;

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .expect(200);

      const blogsAtEnd = await blogsInDb();
      expect(blogsAtEnd[0]).not.toEqual(blogToUpdate);
    });
    test('Updating with invalid id correspond with proper error', async () => {
      const id = '1221ololo08080474747';
      const blogsAtStart = await blogsInDb();

      const request = await api
        .put(`/api/blogs/${id}`)
        .expect(400);

      const blogsAtEnd = await blogsInDb();
      expect(blogsAtStart).toEqual(blogsAtEnd);
      const errorMsg = JSON.parse(request.text).message;
      expect(errorMsg).toEqual('invalid id');
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});