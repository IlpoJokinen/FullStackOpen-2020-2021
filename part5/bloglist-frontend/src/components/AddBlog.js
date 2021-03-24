import React, { useState } from 'react';

const AddBlog = ({ createBlogPost }) => {
  const [newBlog, setNewBlog] = useState({});

  const addBlog = async (event) => {
    event.preventDefault();

    await createBlogPost(newBlog);
    setNewBlog('');
  };

  return (
    <div className="block">

      <h2 className="heading-secondary u-margin-bottom-medium">Create new blog</h2>
      <form onSubmit={addBlog}>
        <div className="inputGroup">
          <p className="paragraph">Title </p>
          <input
            type="text"
            value={newBlog.title || ''}
            onChange={({ target }) => setNewBlog((prevState) => ({ ...prevState, title: target.value }))}
          />
        </div>
        <div className="inputGroup">
          <p className="paragraph">Author </p>
          <input
            type="text"
            value={newBlog.author || ''}
            onChange={({ target }) => setNewBlog((prevState) => ({ ...prevState, author: target.value }))}
          />
        </div>
        <div className="inputGroup">
          <p className="paragraph">Url </p>
          <input
            type="text"
            value={newBlog.url || ''}
            onChange={({ target }) => setNewBlog((prevState) => ({ ...prevState, url: target.value }))}
          />
        </div>
        <button type="submit" className="button button-submit">Create</button>
      </form>
    </div>
  );

};

export default AddBlog;