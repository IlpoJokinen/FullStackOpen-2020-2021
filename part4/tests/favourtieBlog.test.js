const favouriteBlog = require('../utils/list_helper').favouriteBlog;
const blogs = require('../tests/data/blogData').blogs;
const blogsWithMultipleMostLikedBlogs = require('../tests/data/blogData').blogsWithMultipleMostLikedBlogs;

describe('favourite blog (most likes)', () => {
  test('if one blog with most likes', () => {
    const result = favouriteBlog(blogs);
    expect(result).toEqual(blogs[2]);
  });
  test('if multiple blogs with most likes should return one of these blogs randomly', () => {
    const result = favouriteBlog(blogsWithMultipleMostLikedBlogs);
    expect(result).toHaveProperty('likes', result.likes);
  });
});
