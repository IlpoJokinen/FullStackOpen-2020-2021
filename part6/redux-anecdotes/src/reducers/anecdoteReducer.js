import service from '../services/anecdoteService'
import { showNotification } from '../reducers/notificationReducer'
import { filterByInput } from '../reducers/filterReducer'

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

export const filterAnecdotes = (input) => {
  return async dispatch => {
    dispatch(filterByInput(input))
    dispatch({
      type: 'FILTER_ANECDOTES',
      input: input
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
    case 'FILTER_ANECDOTES':
      const filteredAnecdotes = state.map(anecdote => {
        if (anecdote.content.includes(action.input)) {
          return { ...anecdote, filtered: false }
        } else {
          return { ...anecdote, filtered: true }
        }
      })
      return filteredAnecdotes
    default:
      return state
  }
}

export default reducer