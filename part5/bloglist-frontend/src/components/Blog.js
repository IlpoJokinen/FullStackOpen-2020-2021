import React, { useState } from 'react'
const Blog = ({ blog, index, update, user, removeBlog }) => {
  const [blogInfo, setBlogInfo] = useState(blog.title);
  const buttonLabel = blogInfo === blog ? 'Hide' : 'View';

  const toggleDetails = () => blogInfo === blog ? setBlogInfo(blog.title) : setBlogInfo(blog);

  const giveLike = () => {
    let updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    };
    update(updatedBlog);
    setBlogInfo(blog);
  };

  return (
    <div className="blogPost">
      <div className="blogInfoRow-header">
        <p className="paragraph-header">
          Blog {index + 1}
        </p>
        <button className="button" onClick={toggleDetails}>{buttonLabel}</button>
      </div>
      <div className="blogInfoRow">
        <p className="paragraph">
          <strong>Title: </strong>
          {blog.title}
        </p>
      </div>
      {blogInfo === blog && (
        <div>
          <div className="blogInfoRow">
            <p className="paragraph">
              <strong>Url: </strong>
              {blog.url}
            </p>
          </div>
          <div className="blogInfoRow">
            <p className="paragraph">
              <strong>Likes: </strong>
              {blog.likes}
            </p>
          </div>
          <div className="blogInfoRow">
            <p className="paragraph">
              <strong>Author: </strong>
              {blog.author}
            </p>
          </div>
          <div className="blogInfoRow-buttons">
            <button className="button" onClick={giveLike}>Like</button>
            {user.userId === blog.user.id && (
              <button className="button button-warning" onClick={() => removeBlog(blog)}>Remove</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog