import PropTypes from 'prop-types'

const Notification = ({ info }) => {
  if (!info.message) {
    return null
  }

  return (
    <div className='msg'
      style={{
        color: info.type === 'error' ? 'red' : 'green'
      }}>
      {info.message}
    </div >
  )
}

export default Notification