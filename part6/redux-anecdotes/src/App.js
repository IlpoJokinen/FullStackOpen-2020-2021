import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import NewAnecdote from './components/NewAnecdote'

const App = () => {
  return (
    <div>
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App