import React from 'react';

const Button = ({ id, handler }) => {
    return (
        <button id={id} onClick={handler}>
            show
        </button>
    );
};

const FoundCountries = ({ result, handler }) => {
    if (typeof result === 'string') {
        return (
            <div>
                <p>{result}</p>
            </div>
        );
    } else if (result.length <= 10 && result.length > 1) {
        return (
            <ul>
                {result.map((country, i) => (
                    <li key={i}>
                        {country.name} <Button id={i} handler={handler} />
                    </li>
                ))}
            </ul>
        );
    } else if (result.length === 1) {
        const [country] = result;

        return (
            <div>
                <h2>{country.name}</h2>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>

                <h3>languages:</h3>
                <ul>
                    {Object.values(country.languages).map((lang, i) => (
                        <li key={i}>{lang}</li>
                    ))}
                </ul>
                <img src={country.flag} alt={`${country.name} flag`}></img>
            </div>
        );
    } else {
        return <></>;
    }
};
export default FoundCountries;
