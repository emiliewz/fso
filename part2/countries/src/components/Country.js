import CountryView from "./CountryView"

const Country = ({ result, handleShow }) => {
  return (
    result.map(c =>
      <div key={c.name.official}>
        {c.name.common}
        <button onClick={() => handleShow(c)}>show</button>
        {c.show && < CountryView country={c} />}
      </div >)
  )
}

export default Country