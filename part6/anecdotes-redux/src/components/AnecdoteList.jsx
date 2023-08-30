import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const addVote = (id) => {
    dispatch(voteFor(id))
  }

  const Anecdote = ({ anecdote }) => (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => addVote(anecdote.id)}>vote</button>
      </div>
    </div>
  )

  const anecdoteToShow = anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {anecdoteToShow.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote} />
      )}
    </div>
  )
}

export default AnecdoteList