import { useState } from "react";

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const onGoodClick = () => {
    setGood(good + 1)
    setAll(n => n + 1)
  }

  const onNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(n => n + 1)
  }

  const onBadClick = () => {
    setBad(bad + 1)
    setAll(n => n + 1)
  }

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={onGoodClick}>good</button>
      <button onClick={onNeutralClick}>neutral</button>
      <button onClick={onBadClick}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {(good - bad) / all}</p>
      <p>positive {(good / all) * 100}%</p>
    </>
  )
}

export default App;
