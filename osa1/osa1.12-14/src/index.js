import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      pisteet: new Array(6).fill(0)
    }

  }

  randomAnecdote = (x) => () => this.setState({
    [x]: Math.floor(Math.random() * 6)
  })

  vote = () => this.setState({
    pisteet: this.state.pisteet.map((vote, index) => {
      if (index === this.state.selected) {
        return vote + 1;
      } else {
        return vote;
      }
    })
  })

  mostVoted = function () {
    var suurin = 0
    var suurimmanindeksi = 0
    this.state.pisteet.forEach((vote, index) => {
      if (vote > suurin) {
        suurin = vote
        suurimmanindeksi = index
      }
    }

    )
    return suurimmanindeksi
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <br></br>

        <Pisteet pisteet={this.state.pisteet[this.state.selected]} />

        <Button
          handleClick={this.randomAnecdote('selected')}
          text="next anecdote"
        />
        <Button
          handleClick={this.vote}
          text="vote"
        />
        <EnitenAania anecdote = {this.props.anecdotes[this.mostVoted()]} votes = {this.state.pisteet[this.mostVoted()]}/>

      </div>


    )
  }
}

const EnitenAania = ({ anecdote, votes }) => {
  if (votes === 0) {
    return (
      <div>Zero votes given</div>
    )

  }

  else {
    return (
      <div>
        <h2>anecdote with most votes:</h2>
        {anecdote}
        <br></br>
        has {votes} votes

      </div>
    )
  }
}

const Pisteet = ({ pisteet }) => (
  <div>
    has {pisteet} votes
  </div>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)