import { useReducer, useContext, createContext } from 'react'

const NotificationContext = createContext()

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return `anecdote '${action.payload}' voted`
    case 'CREATE':
      return `anecdote '${action.payload}' created`
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}
