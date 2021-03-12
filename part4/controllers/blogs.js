/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const getTokenFrom = require('../utils/auth').getTokenFrom;
const jwt = require('jsonwebtoken');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 });
  res.json(blogs.map(blog => blog.toJSON()));
});

blogRouter.post('/', async (req, res) => {
  const { body } = req;

  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ message: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  let likes = !body.likes ? 0 : body.likes;
  const blogObject = { ...body, likes: likes, user: user._id };

  const blog = new Blog(blogObject);
  const savedBlog = await blog.save();

  res.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogRouter.put('/:id', async (req, res) => {
  const { body } = req;
  const blog = JSON.parse(JSON.stringify(body));

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
  res.json(updatedBlog);
});

module.exports = blogRouter;