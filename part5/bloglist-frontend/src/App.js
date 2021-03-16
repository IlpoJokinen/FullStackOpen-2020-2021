import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import LoginForm from './components/LogInForm';
import AddBlog from './components/AddBlog';

import blogService from './services/blogs';
import authService from './services/auth';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [newBlog, setNewBlog] = useState({});

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsFromDatabase = await blogService.getAll();
      setBlogs(blogsFromDatabase);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [])


  const createBlogPost = async (event) => {
    event.preventDefault();

    const createdBlog = await blogService.create(newBlog);
    setNewBlog({});
    setBlogs(blogs.concat(createdBlog));
  };

  return (
    <div className="section-block">
      {user !== null
        ?
        <div className="u-margin-bottom-medium">
          <p className="paragraph">Welcome {user.name}!</p>
          <button onClick={() => authService.logout(setUser)} className="submitButton">Log Out</button>
        </div>
        :
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setUser={setUser}
          setErrorMsg={setErrorMsg}
        />
      }
      {errorMsg && (
        <p className="paragraph">{errorMsg}</p>
      )}
      {user && (
        <div>
          <div>
            <AddBlog
              newBlog={newBlog}
              setNewBlog={setNewBlog}
              createBlogPost={createBlogPost}
            />
          </div>
          <div className="block">
            <h2 className="heading-secondary u-margin-bottom-medium">Blogs</h2>
            {blogs.map((blog, index) =>
              <Blog key={blog.id} blog={blog} index={index} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App