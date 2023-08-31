import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../server/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const newAnecdote = action.payload
      return state.map(a =>
        a.id !== newAnecdote.id ? a : newAnecdote)
    },
  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = (id) => {
  console.log('id', id)
  return async dispatch => {
    const newAnecdote = await anecdoteService.updateVotes(id)
    dispatch(updateAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer