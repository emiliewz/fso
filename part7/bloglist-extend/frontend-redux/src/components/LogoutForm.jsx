import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/infoReducer'
import { logout } from '../reducers/loginReducer'

const LogoutForm = () => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)

  const handleClick = () => {
    dispatch(logout())
    dispatch(setNotification('logged out'))
  }

  return (
    <div>
      {login.name} logged in
      <button onClick={handleClick}>logout</button>
    </div>
  )
}

export default LogoutForm