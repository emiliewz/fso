import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './blogReducer'
import infoReducer from './infoReducer'
import userReducer from './userReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    info: infoReducer,
  }
})

export default store

