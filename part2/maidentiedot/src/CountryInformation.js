import React, { useState, useEffect } from 'react';

import WeatherInfo from './components/WeatherInfo';

const CountryInformation = ({ searchWord, countries }) => {
    const [matchingCountries, setMatchingCountries] = useState([]);

    useEffect(() => {
        setMatchingCountries(
            countries.filter(c => c.name.toLowerCase().includes(searchWord.toLowerCase()))
        )
    }, [searchWord, countries]);

    const showCountryInfo = (name) => {
        const countryFound = matchingCountries.find(c => c.name === name);
        setMatchingCountries([countryFound]);
    };

    if (matchingCountries) {
        switch (true) {
            case matchingCountries.length > 10:
                return <p>Too many matches, specify another filter</p>;
            case matchingCountries.length > 1 && matchingCountries.length < 10:
                const names = matchingCountries.map(c => c.name);
                return (
                    <div>
                        {names.map((name, i) => (
                            <div key={i}>
                                <p>{name + " "}<button onClick={() => showCountryInfo(name)}>show</button></p>
                            </div>
                        ))}
                    </div>
                );
            case matchingCountries.length === 1:
                const { name, capital, population, languages, flag } = matchingCountries[0];

                return (
                    <div>
                        <div style={{ marginBottom: 20 }}>
                            <h1>{name}</h1>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <p>{`capital ${capital}`}</p>
                            <p>{`population ${population}`}</p>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <h3>Spoken languages</h3>
                            <ul>
                                {languages.map((obj, i) => (
                                    <li key={i}>
                                        {obj.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <img src={flag} style={{ width: 100, height: 100 }} alt='flag' />
                        </div>
                        <WeatherInfo capital={capital} />
                    </div>
                );
            default:
                return <p>No countries match the searched input</p>;
        }
    }
    return null;
};

export default CountryInformation;