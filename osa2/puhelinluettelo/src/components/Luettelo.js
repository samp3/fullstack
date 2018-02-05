import React from 'react'

const Luettelo = ({ persons, deleteFunction }) => {

    return (
        <table>
            <tbody>
                {persons.map(person => (
                    <Person person={person} deleteFunction={deleteFunction} />
                ))}
            </tbody>
        </table>
    )
}

const Person = ({ person, deleteFunction }) => {
    return (
        <tr key={person.name}>
            <td>{person.name} </td>
            <td>{person.number}</td>
            <td><button onClick={deleteFunction(person)}>poista</button></td>
        </tr>
    )
}

export default Luettelo