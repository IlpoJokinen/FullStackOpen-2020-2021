import React, { useState, useEffect, useRef } from 'react';

import AddBlog from './components/AddBlog';
import Blog from './components/Blog';
import InfoBox from './UI/InfoBox';
import LoginForm from './components/LogInForm';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import authService from './services/auth';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [text, setText] = useState(null);
  const [newBlog, setNewBlog] = useState({});

  const blogFormRef = useRef();

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

    try {
      blogFormRef.current.toggleVisibility();
      const createdBlog = await blogService.create(newBlog);
      setNewBlog({});
      setBlogs(blogs.concat(createdBlog));
      setText({ message: `A new blog ${createdBlog.title} by ${createdBlog.author} added`, status: 'success' });
      setTimeout(() => {
        setText(null);
      }, 5000);
    } catch (error) {
      console.log(error)
      setText({ message: `${error.response.data.message}`, status: 'error' });
      setTimeout(() => {
        setText(null);
      }, 5000);
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <AddBlog
        newBlog={newBlog}
        setNewBlog={setNewBlog}
        createBlogPost={createBlogPost}
      />
    </Togglable>
  );

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
          setText={setText}
        />
      }
      {text && (
        <InfoBox text={text} />
      )}
      {user && (
        <div>
          {blogForm()}
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