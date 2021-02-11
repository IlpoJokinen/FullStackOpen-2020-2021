import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CountryFinder from './components/CountryFinder';
import CountryInformation from './CountryInformation';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchWord, setWord] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  return (
    <div>
      <CountryFinder setWord={setWord} />
      <CountryInformation searchWord={searchWord} countries={countries} />
    </div>
  );
};

export default App;
