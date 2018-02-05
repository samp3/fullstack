
import React from 'react'

const Luettelo = ({ countries, clickFunction }) => {

    if (countries.length < 10 && countries.length > 1) {
        return (
            <table>
                <tbody>
                    {countries.map(country => (
                        <Country country={country} clickFunction={clickFunction} />
                    ))}
                </tbody>
            </table>
        )
    }

    else if (countries.length >= 10) {
        return (<div>Too many matches, specify another filter</div>)

    }

    else if (countries.length === 1) {
        const country = countries[0]

        return (
            <div>
                <h1>{country.name} {country.nativeName}</h1>
                <div>capital: {country.capital}</div>
                <div>population: {country.population}</div>
                <img width="70%" alt={country.name} src={country.flag} />
            </div>
        )

    }
    else {
        return (<div>No matches, specify another filter</div>)
    }


}

const Country = ({ country, clickFunction }) => {
    return (
        <tr key={country.name}>
            <td onClick={clickFunction(country.name)}>{country.name} </td>
        </tr>
    )
}

export default Luettelo