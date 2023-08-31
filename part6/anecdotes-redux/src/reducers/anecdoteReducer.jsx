import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteFor(state, action) {
      const id = action.payload
      const anecdoteToUpdate = state.find(a => a.id === id)
      const updatedAnecdote = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }

      console.log(JSON.parse(JSON.stringify(state)))

      return state.map(a =>
        a.id !== id ? a : updatedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteFor, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer