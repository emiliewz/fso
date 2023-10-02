const Notify = ({ info }) => {
  if (!info) return null

  return (
    <Alert variant='danger'>
      {info}
    </Alert>
  )
}

export default Notify