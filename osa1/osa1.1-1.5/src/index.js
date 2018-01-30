import React from 'react'
import ReactDOM from 'react-dom'
const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi.nimi} </h1>
        </div>
    )
}

const Sisalto = (props) => {

    return (
        <div>
           <p>{props.kurssi.osat[0].nimi} {props.kurssi.osat[0].tehtavia}</p>
           <p>{props.kurssi.osat[1].nimi} {props.kurssi.osat[1].tehtavia}</p>
           {props.kurssi.osat[2].nimi} {props.kurssi.osat[2].tehtavia}  
        </div>
    )
}


const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.kurssi.osat[0].tehtavia + props.kurssi.osat[1].tehtavia + props.kurssi.osat[2].tehtavia} tehtävää</p>
        </div>
    )
}


const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi} />
            <Yhteensa kurssi={kurssi} />
        </div>
    )

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

