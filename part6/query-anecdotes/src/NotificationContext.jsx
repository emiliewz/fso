import { useReducer, useContext, createContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const [notificationDispatch] = useContext(NotificationContext)
  return notificationDispatch
}

export const useNotification = (payload) => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  return (payload) => {
    notificationDispatch({ type: 'SET', payload })
    setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
  }
}

export default NotificationContext