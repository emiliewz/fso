import { useEffect, useState } from "react"
import axios from "axios"
import CountryView from "./components/CountryView"
import Country from "./components/Country"

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
    setResult(filteredCountries.map(c => {
      return { ...c, show: false }
    }))
  }

  const handleShow = c => setResult(result.map(n =>
    n.name.official !== c.name.official
      ? n
      : { ...c, show: !c.show }
  ))

  const display = result.length > 10 ? <p>Too many matches, specify another filter</p>
    : result.length > 1 ? <Country result={result} handleShow={handleShow} />
      : result.length === 1 ? <CountryView country={result[0]} />
        : null

  return (
    <>
      find countries <input value={search} onChange={handleChange} />
      {display}
    </>
  )
}

export default App
