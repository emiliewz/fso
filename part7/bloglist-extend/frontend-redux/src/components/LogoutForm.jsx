import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/infoReducer'
import { logout } from '../reducers/userReducer'

const LogoutForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleClick = () => {
    dispatch(logout())
    dispatch(setNotification('logged out'))
  }

  return (
    <div>
      {user.name} logged in
      <button onClick={handleClick}>logout</button>
    </div>
  )
}

export default LogoutForm