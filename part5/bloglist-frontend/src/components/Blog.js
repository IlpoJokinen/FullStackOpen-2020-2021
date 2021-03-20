import React, { useState } from 'react'
const Blog = ({ blog, index }) => {
  const [blogInfo, setBlogInfo] = useState(blog.title);
  const buttonLabel = blogInfo === blog ? 'Hide' : 'View';
  const toggleDetails = () => blogInfo === blog ? setBlogInfo(blog.title) : setBlogInfo(blog);

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
            <button>Like</button>
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