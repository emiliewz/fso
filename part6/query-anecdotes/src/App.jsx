import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './request'
import { useReducer } from 'react'
import { notificationReducer } from './NotificationContext'

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const sendNotification = (type, payload) => {
    notificationDispatch({ type, payload })
    setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
  }

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.concat(newAnecdote))
    },
    onError: () => sendNotification('ERROR')
  })

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (returnedAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.map(a =>
        a.id !== returnedAnecdote.id ? a : returnedAnecdote))
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    sendNotification('VOTE', anecdote.content)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false
  })

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  } else if (result.isLoading) {
    return <div>loading data</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notification={notification} />
      <AnecdoteForm createAnecdote={newAnecdoteMutation} sendNotification={sendNotification} />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App