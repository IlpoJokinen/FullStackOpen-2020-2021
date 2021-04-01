import service from '../services/anecdoteService'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

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