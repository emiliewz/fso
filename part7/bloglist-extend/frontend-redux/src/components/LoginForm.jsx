import { loginWith } from '../reducers/loginReducer'
import { setNotification } from '../reducers/infoReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const credentials = {
        username: event.target.username.value,
        password: event.target.password.value
      }
      dispatch(loginWith(credentials))
      dispatch(setNotification('Welcome!'))
      navigate('/')
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error'))
    }
    event.target.username.value = ''
    event.target.password.value = ''
  }

  return (
    <>
      <h2>log in to application</h2>
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
    </>
  )
}

export default LoginForm
