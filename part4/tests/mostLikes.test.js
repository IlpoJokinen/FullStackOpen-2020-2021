const mostLikes = require('../utils/list_helper').mostLikes;
const { blogs, blogsWithTwoMostLikedBloggers } = require('./data/blogData');

describe('Blogger with most liked post and likes in total', () => {

  beforeAll(() => {
    const result = mostLikes(blogs);
    expect(result).toHaveProperty('author' && 'likes');
  });

  test('if one most liked blogger', () => {
    const result = mostLikes(blogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });

  test('if multiple bloggers with same amount of total likes', () => {
    const result = mostLikes(blogsWithTwoMostLikedBloggers);
    expect(result).toHaveProperty('likes', result.likes);
  });

});

