import React from 'react'
import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/anecdoteReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const filter = (event) => {
    dispatch(filterAnecdotes(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={filter} />
    </div>
  )
}

export default Filter