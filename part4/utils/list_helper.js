const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, likes) => {
    return sum += likes;
  };

  return blogs
    .map(blog => blog.likes)
    .reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  const mostLikes = Math.max.apply(Math, blogs.map(blog => blog.likes));
  const favouriteBlogs = blogs.filter(blog => blog.likes === mostLikes);

  return favouriteBlogs[Math.floor(Math.random() * favouriteBlogs.length)];
};

const mostBlogs = (blogs) => {
  const author = _.maxBy(Object.values(_.groupBy(blogs, blog => blog.author)), arr => arr.length)[0].author;
  const posts = blogs.filter(blog => blog.author === author).length;
  const mostActiveBlogger = {
    author: author,
    blogs: posts
  };
  return mostActiveBlogger;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
};