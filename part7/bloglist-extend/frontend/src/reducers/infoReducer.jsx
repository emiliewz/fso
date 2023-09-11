import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, type: 'info' }

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    createInfo(state, action) {
      return action.payload
    },
    clearInfo(state, action) {
      return null
    }
  }
})

export const { createInfo, clearInfo } = infoSlice.actions

export const setNotification = (message, type = 'info') => {
  return async dispatch => {
    dispatch(createInfo({ message, type }))
    setTimeout(() => dispatch(clearInfo()), 3000)
  }
}

export default infoSlice.reducer