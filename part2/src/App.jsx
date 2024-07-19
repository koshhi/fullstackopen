import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import Country from './Country';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCountry(null)
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Find countries</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      {countriesToShow.length > 10 && <p>Too many matches, specify another filter</p>}
      {countriesToShow.length <= 10 && countriesToShow.length > 1 && (
        <ul>
          {countriesToShow.map(country => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      )}
      {countriesToShow.length === 1 && (
        <Country country={countriesToShow[0]} />
      )}
      {selectedCountry && (
        <Country country={selectedCountry} />
      )}
    </div>
  );
};

export default App;
