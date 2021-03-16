/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll, setToken };