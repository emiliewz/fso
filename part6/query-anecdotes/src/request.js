import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = (anecdote) => {
  if (anecdote.content.length < 5) return Promise.reject()
  return axios.post(baseUrl, anecdote).then(res => res.data)
}

export const updateAnecdote = (updatedanecdote) =>
  axios.put(`${baseUrl}/${updatedanecdote.id}`, updatedanecdote).then(res => res.data)