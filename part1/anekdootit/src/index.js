import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6+1).join('0').split('').map(parseFloat))
  let i = points.indexOf(Math.max(...points))
  console.log(points)

  function HandleVote() {
    let copyPoints = [...points]
    copyPoints[selected] += 1
    setPoints(copyPoints)
  }

  return (
    <div>
      <Title text = 'Anecdote of the day' />
      <div>{props.anecdotes[selected]}</div>
      <p>has {points[selected]} points</p>
      <div>
        <Button onClick = {() => HandleVote()} text = 'vote' />
        <Button onClick = {() => setSelected(RandomAnecdote())} text = 'next anecdote' />
      </div>
      <Title text = 'Anecdote with most votes' />
      <div>{props.anecdotes[i]}</div>
      <p>has {points[i]} points</p>
    </div>
  )
}

const Title = ({ text }) => {
    return <h1>{text}</h1>
}

const Button = ({ onClick, text }) => {

    return <button onClick = {() => onClick()}>{text}</button>
}

const RandomAnecdote = () => {
    let arraySize = anecdotes.length
    return Math.floor(Math.random() * arraySize)
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)