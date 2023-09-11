import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      const blog = action.payload
      return state.concat(blog)
    },
    setBlogs(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      state.push(action.payload)
    }
  }
})

export const { appendBlog, setBlogs, createBlog } = blogSlice.actions

export default blogSlice.reducer

