/* eslint-disable no-unused-vars */
const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  const { body } = req;
  let likes = !body.likes ? 0 : body.likes;
  const blogObject = { ...body, likes: likes };
  const blog = new Blog(blogObject);
  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

module.exports = blogRouter;