import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './blogReducer'
import infoReducer from './infoReducer'
import userReducer from './userReducer'
import usersReducer from './usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    info: infoReducer,
    users: usersReducer
  }
})

export default store

