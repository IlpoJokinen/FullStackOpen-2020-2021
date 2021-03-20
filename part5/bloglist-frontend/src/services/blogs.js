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

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateOneBlog = async updatedBlog => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog);
  return response.data;
};

const removeBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config);
  return;
}

export default { getAll, setToken, create, updateOneBlog, removeBlog };