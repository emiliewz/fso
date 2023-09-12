import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/infoReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const credentials = {
        username: event.target.username.value,
        password: event.target.password.value
      }
      dispatch(login(credentials))
      dispatch(setNotification('Welcome!'))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error'))
    }
    event.target.username.value = ''
    event.target.password.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          id='username'
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
        />
      </div>
      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )
}

export default LoginForm
