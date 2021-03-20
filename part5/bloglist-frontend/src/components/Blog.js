import React, { useState } from 'react'
const Blog = ({ blog, index, update }) => {
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
        <button onClick={toggleDetails}>{buttonLabel}</button>
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
            <button onClick={giveLike}>Like</button>
          </div>
          <div className="blogInfoRow">
            <p className="paragraph">
              <strong>Author: </strong>
              {blog.author}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog