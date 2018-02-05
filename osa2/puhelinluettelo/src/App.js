import React from 'react';
import personService from './services/Persons';
import Luettelo from './components/Luettelo';
import Notification from './components/Notification'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            message: null

        }
    }

    componentWillMount() {
        personService
            .getAll()
            .then(response => {
                this.setState({ persons: response })
            })
    }

    addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber

        }
        const idd = this.state.filter(p => p.name === personObject.name).id

        if (this.state.persons.some(person => person.name === personObject.name)) {
            const updatedPerson = { ...this.state.persons.find(p => p.name === personObject.name), name: personObject.name, number: personObject.number }
            if (window.confirm(`${personObject.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {

                personService
                    .update(updatedPerson.id, updatedPerson)
                    .then(newPerson => {
                        const ps = this.state.persons.filter(pers => pers.id !== updatedPerson.id)
                        this.setState({
                            persons: ps.concat(newPerson),
                            newName: '',
                            newNumber: '',
                            message: `lisättiin ${updatedPerson.name}`
                        })
                        setTimeout(() => {
                            this.setState({ message: null })
                        }, 5000);
                    })
                    .catch(error => {
                        this.setState({
                            persons: this.state.persons.filter(p => p.id !== idd),
                            message: `Valitettavasti ${personObject.name} on jo poistettu tietokannasta`
                        })
                    })
            }


        }
        else {
            const idd = this.state.filter(p => p.name === this.state.newName).id
            const nameasd = this.state.filter(p => p.name === this.state.newName).name
            personService
                .create(personObject)
                .then(newPerson => {
                    this.setState({
                        persons: this.state.persons.concat(newPerson),
                        newName: '',
                        newNumber: '',
                        message: `lisättiin ${this.state.newName}`
                    })
                    setTimeout(() => {
                        this.setState({ message: null })
                    }, 5000);
                })
        }

    }

    deletePerson = (person) => {
        return () => {
            if (window.confirm(`Haluatko poistaa henkilön ${person.name}?`)) {
                personService
                    .del(person.id)
                    .then(response => {
                        this.setState({
                            persons: this.state.persons.filter(p => p.id !== person.id),
                            message: 'Poisto onnistui!'
                        })
                        setTimeout(() => {
                            this.setState({ message: null })
                        }, 5000);


                    })

            }
        }
    }

    handleNameChange = (event) => {

        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }




    render() {
        const filtered = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Notification message={this.state.message} />

                <div>
                    rajaa näytettäviä: <input
                        value={this.state.filter}
                        onChange={this.handleFilterChange}

                    />
                </div>
                <h3>Lisää uusi</h3>
                <form onSubmit={this.addPerson}>

                    <div>
                        nimi: <input
                            value={this.state.newName}
                            onChange={this.handleNameChange}
                        />
                    </div>

                    <div>
                        numero: <input
                            value={this.state.newNumber}
                            onChange={this.handleNumberChange}
                        />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h3>Numerot</h3>
                <Luettelo persons={filtered} deleteFunction={this.deletePerson.bind(this)} />
            </div>

        )
    }
}


export default App