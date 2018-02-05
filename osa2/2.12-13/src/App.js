import React from 'react'
import axios from 'axios'
import Luettelo from './components/Luettelo'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }



  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleClick = (country) => {
    return () => {
      this.setState({ filter: country })
    }
  }


  render() {
    const filtered = this.state.countries.filter(maa => maa.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <div>
        <div>
          find countries: <input
            value={this.state.filter}
            onChange={this.handleFilterChange}
          />
        </div>
        <Luettelo countries={filtered} clickFunction={this.handleClick.bind(this)} />
      </div>
    );
  }
}

export default App;