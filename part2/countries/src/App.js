import { useEffect, useState } from 'react';
import axios from 'axios';
import FilterCountries from './components/FilterCountries';
import FoundCountries from './components/FoundCountries';
import Weather from './components/Weather';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState('');
    const [results, setResults] = useState([]);

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    const hook = () => {
        axios.get('https://restcountries.com/v3.1/all').then((response) => {
            setCountries(
                response.data.map(
                    ({ name, flags, area, capital, languages }) => {
                        return {
                            name: name.common,
                            flag: flags.png,
                            area: area,
                            capital: capital,
                            languages: languages,
                        };
                    }
                )
            );
        });
    };

    useEffect(hook, []);

    const findCountry = (event) => {
        setFilter(event.target.value);
        setResults([]);
    };

    const filterResults = () => {
        let filteredResults = countries.filter((country) =>
            country.name.toLowerCase().includes(filter)
        );
        if (filteredResults.length > 1 && filteredResults.length <= 10) {
            return filteredResults;
        } else if (filteredResults.length > 10) {
            return 'Too many matches, specify another filter';
        } else if (filteredResults.length === 1) {
            return filteredResults;
        } else {
            return 'No countries were found';
        }
    };

    const result = filter ? filterResults() : '';

    const handleClick = (event) => {
        setResults([result[event.target.getAttribute('id')]]);
    };

    return (
        <div>
            <FilterCountries countries={countries} handler={findCountry} />

            {results.length ? (
                <div>
                    <FoundCountries result={results} />
                    <Weather result={results} API_KEY={API_KEY} />
                </div>
            ) : (
                <div>
                    <FoundCountries result={result} handler={handleClick} />
                    {result.length === 1 ? (
                        <Weather result={result} API_KEY={API_KEY} />
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
