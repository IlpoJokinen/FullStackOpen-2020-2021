const totalLikes = (blogs) => {
  const reducer = (sum, likes) => {
    return sum += likes;
  };

  return blogs
    .map(blog => blog.likes)
    .reduce(reducer, 0);
};

module.exports = {
  totalLikes
};