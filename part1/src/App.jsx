import React from 'react'
import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{`${text}:`}</td><td>{value}</td> 
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const totalCounter = good + neutral + bad
  const positiveOnly = (good / totalCounter) * 100 || 0


  if (totalCounter === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All votations" value={totalCounter} />
          <StatisticLine text="Positive only" value={`${positiveOnly}%`} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newGoodState = good + 1
    setGood(newGoodState);
    //console.log(newGoodState)
  }

  const handleBad = () => {
    const newBadState = bad + 1
    setBad(newBadState);
    //console.log(newBadState)
  }

  const handleNeutral = () => {
    const newNeutralState = neutral + 1
    setNeutral(newNeutralState);
    //console.log(newNeutralState)
  }

  return (
    <div>
      <h1>Give Feedback!</h1>
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App