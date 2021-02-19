/* eslint-disable no-unused-vars */
const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
  let blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  let blogs = await Blog.find({});
  const blog = new Blog(req.body);
  let savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

module.exports = blogRouter;