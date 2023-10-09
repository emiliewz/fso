const Notification = ({ info }: {info: string}) => {
  if (!info) return null

  return (
    <div style={{color: 'red'}}>
      {info}
    </div>
  )
}

export default Notification