/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 });
  res.json(blogs.map(blog => blog.toJSON()));
});

blogRouter.post('/', middleware.userExtractor, async (req, res) => {
  const { body } = req;
  const user = await User.findById(req.user);

  let likes = !body.likes ? 0 : body.likes;
  const blogObject = { ...body, likes: likes, user: user._id };
  const blog = new Blog(blogObject);

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

blogRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const blogToRemove = await Blog.findById(req.params.id);
  if (blogToRemove.user.toString() === req.user) {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } else {
    res.status(401).json({ message: 'Only the blog creator can delete the posted blog' });
  }
});

blogRouter.put('/:id', async (req, res) => {
  const { body } = req;
  const blog = JSON.parse(JSON.stringify(body));

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
  res.json(updatedBlog);
});

module.exports = blogRouter;