const addBlog = ({ newBlog, setNewBlog, createBlogPost }) => {


  return (
    <div className="block">
      <h2 className="heading-secondary u-margin-bottom-medium">Create new blog</h2>
      <form onSubmit={createBlogPost}>
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
        <button type="submit" className="submitButton">Create</button>
      </form>
    </div>
  );

};

export default addBlog;