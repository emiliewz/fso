import Country from "./Country"

const Display = ({ result, handleShow }) => {
  return (
    result.map(c =>
      <div key={c.name.official}>
        {c.name.common}
        <button onClick={() => handleShow(c)}>show</button>
        {c.show && < Country country={c} />}
      </div >)
  )
}

export default Display