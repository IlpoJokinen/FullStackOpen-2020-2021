const mostBlogs = require('../utils/list_helper').mostBlogs;
const blogs = require('./data/blogData').blogs;
const blogsWithMultipleTopBloggers = require('./data/blogData').blogsWithMultipleTopBloggers;

describe('most active blogger', () => {
  beforeAll(() => {
    const result = mostBlogs(blogs);
    expect(result).toHaveProperty('author' && 'blogs');
  });

  test('if one author has most posts', () => {
    const result = mostBlogs(blogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    });
  });

  test('if many authors with most blogs', () => {
    const result = mostBlogs(blogsWithMultipleTopBloggers);
    expect(result).toHaveProperty('blogs', result.blogs);
  });
});