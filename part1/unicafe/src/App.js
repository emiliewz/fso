import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return <p>{text} {value}</p>
}

// a proper place to define a component
const Statistics = ({ good, neutral, bad }) => {
  if (!good && !neutral && !bad) {
    return <p>No feedback given</p>
  }
  return <>
    <StatisticLine text="good" value={good} />
    <StatisticLine text="neutral" value={neutral} />
    <StatisticLine text="bad" value={bad} />
    <StatisticLine text="all" value={good + neutral + bad} />
    <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
    <StatisticLine text="positive" value={`${good / (good + neutral + bad) * 100}%`} />
  </>
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGoodClick = () => setGood(good + 1)
  const onNeutralClick = () => setNeutral(neutral + 1)
  const onBadClick = () => setBad(bad + 1)

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={onGoodClick} text='good' />
      <Button handleClick={onNeutralClick} text='neutral' />
      <Button handleClick={onBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App;
