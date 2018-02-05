import React from 'react';
import Person from './components/Person'
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas', number: '12345' },
                { name: 'Sampe', number: '123456' }
            ],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }



    addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber

        }

        if (!this.state.persons.some(person => person.name === this.state.newName)) {
            const persons = this.state.persons.concat(personObject)

            this.setState({
                persons,
                newName: ''
            })
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
                <div>
                    <table>
                        <tbody>
                            {filtered.map(person => <Person key={person.name} person={person} />)}
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}


export default App