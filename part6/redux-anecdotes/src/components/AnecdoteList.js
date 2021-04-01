import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import store from '../store/store'
import Notification from './Notification'

const Anecdote = ({ anecdote, vote }) => {

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={vote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const notification = useSelector(state => state.notification)
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {notification && (
        <Notification />
      )}
      {sortedAnecdotes.map((anecdote, index) => 
        <Anecdote 
          key={index} 
          anecdote={anecdote} 
          vote={() => dispatch(voteAnecdote(anecdote.id))}
        />
      )}
    </div>
  )
}

export default AnecdoteList