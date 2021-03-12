/* eslint-disable no-unused-vars */
const Blog = require('../../models/blog');
const User = require('../../models/user');

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const latestBlogInDb = async () => await Blog.find().sort({ _id: -1 }).limit(1);


const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  blogsInDb,
  usersInDb,
  latestBlogInDb
};