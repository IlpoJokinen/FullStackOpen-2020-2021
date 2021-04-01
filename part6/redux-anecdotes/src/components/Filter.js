import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/anecdoteReducer'

const Filter = (props) => {

  const filter = (event) => {
    props.filterAnecdotes(event.target.value)
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

const ConnectedFilterComponent = connect(null, { filterAnecdotes })(Filter)
export default ConnectedFilterComponent