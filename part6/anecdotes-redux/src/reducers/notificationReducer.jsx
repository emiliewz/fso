import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set_notification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

export const { set_notification, clearNotification } = notificationSlice.actions

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(set_notification(notification))
    setTimeout(() => dispatch(clearNotification()), time * 1000)
  }
}

export default notificationSlice.reducer