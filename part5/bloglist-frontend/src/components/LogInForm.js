/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import authService from '../services/auth';

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  setUser,
  setInfoText
}) => {

  const logIn = async (event) => {
    event.preventDefault();

    try {
      const user = await authService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');
      setInfoText('');
    } catch (exeption) {
      setInfoText({ message: 'Wrong credentials', status: 'error' });
      setTimeout(() => {
        setInfoText(null);
      }, 5000);
    }
  };

  return (
    <div className="block u-margin-bottom-medium">
      <h2 className="heading-secondary u-margin-bottom-medium">log in to application</h2>
      <form onSubmit={logIn} id="loginForm">
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
        <button type="submit" className="button button-submit">Log In</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setInfoText: PropTypes.func.isRequired
};

export default LoginForm;