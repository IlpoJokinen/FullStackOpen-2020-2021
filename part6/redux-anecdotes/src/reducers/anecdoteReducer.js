import service from '../services/anecdoteService'
import { showNotification } from '../reducers/notificationReducer'

export const init = () => {
  return async dispatch => {
    const anecdotes = await service.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await service.getOne(id)
    await service.voteAnecdote(anecdote)
    dispatch({
      type: 'VOTE',
      anecdote
    })
    dispatch(showNotification(
      `You voted '${anecdote.content}'`,
      5
    ))
  }
}

export const createAnecdote = (newAnecdote) => {
  return async dispatch => {
    const anecdote = await service.create(newAnecdote)
    dispatch({
      type: 'CREATE',
      anecdote
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const changedAnecdote = { ...action.anecdote, votes: action.anecdote.votes + 1 } 
      return state.map(anecdote => 
          anecdote.id !== action.anecdote.id ? anecdote : changedAnecdote
      )
    case 'CREATE':
      return [ ...state, action.anecdote ]
    case 'INIT_ANECDOTES':
      return state.concat(action.anecdotes) 
    default:
      return state
  }
}

export default reducer