import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const incrementGood = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const incrementOk = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const incrementBad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const setInitialState = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={incrementGood}>good</button> 
      <button onClick={incrementOk}>neutral</button> 
      <button onClick={incrementBad}>bad</button>
      <button onClick={setInitialState}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)