import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {

  let total = good + neutral + bad
  let avr = (good * 1 + bad * -1) / total

  if(good + neutral + bad !== 0) {

    return (
      <div>
        <table>
          <tbody>
          <Statistic text = 'good' value = {good} />
          <Statistic text = 'neutral' value = {neutral} />
          <Statistic text = 'bad' value = {bad} />
          <Statistic text = 'total' value = {total} />
          <Statistic text = 'average' value = {avr} />
          <Statistic text = 'positive' value = {good / total * 100 + ' %'} />
          </tbody>
        </table>
      </div>
    )
  }
  return <div><p>No Feedback Given</p></div>
}
const Statistic = ({text,value}) => {
 
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
}

const Button = ({ handleClick, text }) => (

    <button onClick = {handleClick}>
        {text}
    </button>
)
const Title = ({text}) => {
  return <h1>{text}</h1>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  return (
    <div>
      <Title text = 'Give Feedback' />
      <Button handleClick = {() => setGood(good + 1)} text = 'good' />
      <Button handleClick = {() => setNeutral(neutral + 1)} text = 'neutral' />
      <Button handleClick = {() => setBad(bad + 1)} text = 'bad' />
      <Title text = 'Statistics' />
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)