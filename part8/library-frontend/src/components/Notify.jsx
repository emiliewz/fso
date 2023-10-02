import { Alert } from 'react-bootstrap'

const Notify = ({ info }) => {
  if (!info || !info.message) return null
  console.log(info)
  return (
    <Alert variant={info.type ? info.type : 'danger'}>
      {info.message}
    </Alert>
  )
}

export default Notify