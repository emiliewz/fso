import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === 'ALL') return anecdotes
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const addVote = (anecdote) => {
    dispatch(voteFor(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  const Anecdote = ({ anecdote }) => (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => addVote(anecdote)}>vote</button>
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