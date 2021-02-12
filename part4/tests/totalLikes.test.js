const totalLikes = require('../utils/list_helper').totalLikes;
const dummyData = require('../tests/data/blogData').blogs;

describe('total likes', () => {
  const listWithOneBlog = [
    {
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    }
  ];

  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('calculating the total likes of the blog dummy data', () => {
    const result = totalLikes(dummyData);
    expect(result).toBe(36);
  });

  test('empty array should return 0', () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  });

});