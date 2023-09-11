import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './blogSlice'
import infoReducer from './infoReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    info: infoReducer
  }
})

export default store

