import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ statName, arvo }) => (
    <tr>
        <td>{statName}</td>
        <td>{arvo}</td>
    </tr>
)

class Statistics extends React.Component {


    render() {
        const { statistics } = this.props
        const maara = (statistics.hyva + statistics.neutraali + statistics.huono)
        const keskiarvo = (statistics.hyva - statistics.huono) / maara
        const positiivisia = (statistics.hyva / maara) * 100 + " %"

        if (maara !== 0) {
            return (
                <div>
                    <table>
                        <tbody>
                            <Statistic statName="hyvä" arvo={statistics.hyva} />
                            <Statistic statName="neutraali" arvo={statistics.neutraali} />
                            <Statistic statName="huono" arvo={statistics.huono} />
                            <Statistic statName="keskiarvo" arvo={keskiarvo} />
                            <Statistic statName="positiivisia" arvo={positiivisia} />
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div>ei yhtään palautetetta annettu</div>
            )
        }
    }
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    kasvataYhdella = (x) => () => this.setState({
        [x]: this.state[x] + 1
    })

    generateButtons() {
        return (
            <div>


                <Button
                    handleClick={this.kasvataYhdella('hyva')}
                    text="hyvä"
                />
                <Button
                    handleClick={this.kasvataYhdella('neutraali')}
                    text="neutraali"
                />
                <Button
                    handleClick={this.kasvataYhdella('huono')}
                    text="huono"
                />

            </div>
        )
    }
    render() {
        return (
            <div>
                <h1>
                    anna palautetta
                </h1>
                {this.generateButtons()}
                <h1>
                    statistiikka
                </h1>
                <div>
                    <Statistics statistics={this.state} />
                </div>

            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)