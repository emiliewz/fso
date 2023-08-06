import axios from "axios"
import { useState, useEffect } from "react"

const CountryView = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
      .then(({ data }) => {
        setWeather(data)
      })
  }, [])

  if (!weather) {
    return null
  }

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
      <p style={{ fontSize: '200px', width: '100%', margin: 0 }}>{country.flag}</p >
      
      <h2 style={{ marginTop: 0 }}>Weather in {country.capital}</h2>

      <p>temperature {weather.main.temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description} weather icon`} />
      <p>wind {weather.wind.speed} m/s</p>

    </>
  )
}
export default CountryView