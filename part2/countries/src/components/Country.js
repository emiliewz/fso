
const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital}
        <br />
        area {country.area}
      </p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
      </ul>
      <p style={{ fontSize: '200px', width: '100%', margin: 0, padding: 0 }}>{country.flag}</p >
    </>
  )
}
export default Country