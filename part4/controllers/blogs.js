/* eslint-disable no-unused-vars */
const blogRouter = require('express').Router();
const { json } = require('express');
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