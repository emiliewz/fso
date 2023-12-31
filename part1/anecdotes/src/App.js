import { useState } from 'react'

const Anecdote = ({ anecdote, vote }) => <p>{anecdote}<br />has {vote} votes</p>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(8));
  const [largest, setLargest] = useState(0)

  const getRandomInt = (max) => Math.floor(Math.random() * max)
  const onNextClick = () => setSelected(getRandomInt(8))
  const onVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    setLargest(copy.indexOf(Math.max(...copy)))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} vote={points[selected]} />
      <Button handleClick={onVoteClick} text='vote' />
      <Button handleClick={onNextClick} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[largest]} vote={points[largest]} />
    </div>
  )
}

export default App