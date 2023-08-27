import PropTypes from 'prop-types'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='msg'
      style={{
        color: isError ? 'red' : 'green'
      }}>
      {message}
    </div >
  )
}

Notification.propTypes = {
  isError: PropTypes.bool.isRequired
}

export default Notification