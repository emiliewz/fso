import loginService from '../services/login'
import { createSlice } from '@reduxjs/toolkit'
import storageService from '../services/storage'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    const loadedUser = storageService.loadUser()
    if (loadedUser) {
      blogService.setToken(loadedUser.token)
      dispatch(setUser(loadedUser))
    }
  }
}

export const login = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    storageService.saveUser(user)
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logout = () => {
  return async dispatch => {
    storageService.removeUser()
    dispatch(setUser(null))
  }
}

export default userSlice.reducer