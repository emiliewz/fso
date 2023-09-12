import { useContext, useReducer, createContext } from 'react'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const [user] = useContext(UserContext)
  return user
}

export const useUserDispatch = () => {
  const [userDispatch] = useContext(UserContext)
  return userDispatch
}

export const useLogin = () => {
  const [user, userDispatch] = useContext(UserContext)

  return (credentials) => userDispatch({ type: 'SET', payload: credentials })
}

export const useLogout = () => {
  const [user, userDispatch] = useContext(UserContext)

  return () => userDispatch({ type: 'SET', payload: null })
}

export default UserContext