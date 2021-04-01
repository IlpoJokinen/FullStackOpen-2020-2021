/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async newAnecdote => {
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const voteAnecdote = async anecdote => {
  const updatedAnecdote = {
    content: anecdote.content,
    votes: anecdote.votes + 1,
    id: anecdote.id 
  }
  console.log(updatedAnecdote)
  const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote);
  return response.data;
};

export default { getAll, getOne, create, voteAnecdote }