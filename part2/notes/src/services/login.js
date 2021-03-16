/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
const baseUrl = '/api/login';

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const logout = setUser => {
  window.localStorage.removeItem('loggedNoteappUser');
  setUser(null);
};

export default { login, logout };