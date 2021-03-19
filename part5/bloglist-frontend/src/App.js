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
  const [infoText, setInfoText] = useState(null);

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


  const createBlogPost = async newBlog => {
    blogFormRef.current.toggleVisibility();

    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      setInfoText({ message: `A new blog ${createdBlog.title} by ${createdBlog.author} added`, status: 'success' });
      setTimeout(() => {
        setInfoText(null);
      }, 5000);
    } catch (error) {
      console.log(error)
      setInfoText({ message: `${error.response.data.message}`, status: 'error' });
      setTimeout(() => {
        setInfoText(null);
      }, 5000);
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <AddBlog createBlogPost={createBlogPost} />
    </Togglable>
  );

  const blogList = () => (
    blogs.map((blog, index) =>
      <Blog key={blog.id} blog={blog} index={index} />
    )
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
          setInfoText={setInfoText}
        />
      }
      {infoText && (
        <InfoBox infoText={infoText} />
      )}
      {user && (
        <div>
          {blogForm()}
          <div className="block">
            <h2 className="heading-secondary u-margin-bottom-medium">Blogs</h2>
            {blogList()}
          </div>
        </div>
      )}
    </div>
  )
}

export default App