import { useState, useEffect } from 'react'
import axios from 'axios'
const apiKey = import.meta.env.VITE_WEATHER_KEY
console.log(apiKey)
const Filter = (props) => {
  return (
    <div>
        find countries <input onChange={props.onChange} />
    </div>
  )
}

const Countries = (props) => {
  return (
    <div>
      {props.country.common}
    </div>
  )
}

const CountryDetail = (props) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${props.country.capital[0]}&appid=${apiKey}&units=metric`).then(reponse => {setWeather(reponse.data)})
  }, [])
  
  return (
    <div>
      <h1>{props.country.name.common}</h1>
      <p>Capital : {props.country.capital}</p>
      <p>Area : {props.country.area}</p>
      <h1>Languages</h1>
      <ul>
        {Object.values(props.country.languages).map(lang => 
        <li key={lang}>{lang}</li>
        )}
      </ul>
      <img src={props.country.flags.png} alt={props.country.name.common} width="150"/>
      {weather && 
  <div>
    <h2>Weather in {props.country.capital[0]}</h2>
    <p>Temperature {weather.main.temp} Celsius</p>
    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"/>
    <p>Wind {weather.wind.speed} m/s</p>
  </div>
  }
    </div>
  )
  
}

const App = () => {
  
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [isPresent, setPresent] = useState('')
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(reponse => {setCountries(reponse.data)})
  }, [])

  const filteredCountries = countries.filter(c => 
  c.name.common.toLowerCase().includes(isPresent.toLowerCase())
)

return (
  <div>
    <Filter onChange={(e) => setPresent(e.target.value)} />
    {filteredCountries.length > 10 
    ? <p>Too many matches</p>
    : filteredCountries.length === 1
    ? <CountryDetail country={filteredCountries[0]} />
    : filteredCountries.map(c => <p key={c.name.common}>{c.name.common} <button onClick={() => setSelected(c)}>Show</button></p>)
    }
    {selected && <CountryDetail country={selected} />}
  </div>
  )
}

export default App