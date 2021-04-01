import React, { useEffect } from 'react'
// import { connect } from 'react-redux'
import { init } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'

const App = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    // props.init()
    dispatch(init())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

// export default connect(null, { init })(App)
export default App