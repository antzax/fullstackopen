import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weather, setWeather] = useState(null);
  const baseUrl = import.meta.env.VITE_COUNTRY_API_URL;
  const weatherApiUrl = import.meta.env.VITE_WEATHER_API_URL;
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // get all countries
  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setCountries(res.data);
    });
  }, []);

  // get weather when only 1 country in the filter
  useEffect(() => {
    if (filteredCountries.length === 1) {
      axios
        .get(
          `${weatherApiUrl}/current.json?key=${weatherApiKey}&q=${filteredCountries[0].name.common}`
        )
        .then((response) => {
          setWeather(response.data);
        });
    }
  }, [filteredCountries]);

  const handleSearch = (e) => {
    const search = e.target.value;

    const filteredCountries =
      search.length > 0
        ? countries.filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
        : [];

    setSearch(search);
    setFilteredCountries(filteredCountries);
  };

  return (
    <>
      <p>
        find countries
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Finland..."
          aria-label="Text"
        />
      </p>

      {filteredCountries.length > 10 && (
        <p>Too many matches specify another search</p>
      )}

      {filteredCountries.length <= 10 && filteredCountries?.length > 1 && (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.ccn3}>
              {country.name.common}{" "}
              <button onClick={() => setFilteredCountries([country])}>
                show {country.name.offical}
              </button>
            </li>
          ))}
        </ul>
      )}

      {filteredCountries.length === 1 && (
        <div className="article">
          <h1>{filteredCountries[0].name.common}</h1>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Area: {filteredCountries[0].area}</p>
          <h2>languages</h2>
          <ul>
            {Object.values(filteredCountries[0].languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img
            src={filteredCountries[0].flags.png}
            alt={filteredCountries[0].flags.alt}
            width="150"
            border="1px solid black"
          />
          <details style={{"margin-top": 30}}>
            <summary role="button">weather</summary>
            {weather && (
              <div className="">
                <h2>
                  Weather in {weather.location.name} ({weather.location.region})
                </h2>
                <p>Temperature {weather.current.temp_c} celsius</p>
                <img
                  src={weather.current.condition.icon}
                  alt={weather.current.condition.text}
                />
                <p>Wind {(weather.current.wind_kph / 3.6).toFixed(1)} m/s</p>
              </div>
            )}
          </details>
        </div>
      )}
    </>
  );
}

export default App;
