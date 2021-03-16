import React from 'react'
const Blog = ({ blog, index }) => (
  <div className="blogPost">
    <p className="paragraph-header">
      Blog {index + 1}
    </p>
    <p className="paragraph">
      <strong>Title: </strong>
      {blog.title}
    </p>
    <p className="paragraph">
      <strong>Author: </strong>
      {blog.author}
    </p>
  </div>
)

export default Blog