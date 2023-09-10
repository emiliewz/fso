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

export default infoSlice.reducer