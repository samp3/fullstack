import React from 'react'
const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi.nimi} </h1>
        </div>
    )
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto sisalto={kurssi.osat} />
            <Yhteensa sisalto={kurssi.osat} />
        </div>
    )
}

const Sisalto = (props) => {
    var osat = props.sisalto.map(osa => { return (<Osa key={osa.id} osa={osa} />) })
    return (
        <div>
            {osat}
        </div>
    )
}

const Yhteensa = (props) => {
    const tehtavienMaara = props.sisalto.reduce((sum, osa) => sum + osa.tehtavia, 0)

    return (
        <div>
            yhteensä {tehtavienMaara} tehtävää
        </div>
    )
}

const Osa = (props) => {
    return (<p>{props.osa.nimi} {props.osa.tehtavia}</p>)
}




export default Kurssi