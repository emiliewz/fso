import { useEffect, useState } from "react"
import axios from "axios"

// const Notification = ({ msg }) => {
//   if (msg === null) {
//     return null
//   }

//   return <p>{msg}</p>
// }

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

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [result, setResult] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleChange = e => {
    const filteredCountries = countries.filter(c => c.name.official.toLowerCase().includes(e.target.value.toLowerCase()))
    setSearch(e.target.value)
    setResult(filteredCountries)
  }

  return (
    <>
      find countries <input value={search} onChange={handleChange} />
      {result.length > 10 ? <p>Too many matches, specify another filter</p>
        : result.length > 1 ? result.map(c => <p key={c.name.official}>{c.name.common}</p>)
          : result.length === 1 ? <Country country={result[0]} />
            : null
      }
    </>
  )
}

export default App
