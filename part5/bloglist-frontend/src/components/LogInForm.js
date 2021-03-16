import authService from '../services/auth';

const loginForm = ({ username, password, setUsername, setPassword, setUser, setErrorMsg }) => {

  const logIn = async (event) => {
    event.preventDefault();

    try {
      const user = await authService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');
      setErrorMsg('');
    } catch (exeption) {
      setErrorMsg('wrong credentials');
    }
  };

  return (
    <div className="block u-margin-bottom-medium">
      <h2 className="heading-secondary u-margin-bottom-medium">log in to application</h2>
      <form onSubmit={logIn}>
        <div className="inputGroup">
          <p className="paragraph">Username</p>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="inputGroup">
          <p className="paragraph">Password</p>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" className="submitButton">Log In</button>
      </form>
    </div>
  );
};

export default loginForm;