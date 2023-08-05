
const Filter = ({ kw, setKw }) => {

  return (
    <>
      filter shown with
      <input
        value={kw}
        onChange={e => setKw(e.target.value)}
      />
    </>
  )
}

export default Filter