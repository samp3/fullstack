import React from 'react'
import Kurssi from './components/Kurssi'


const App = (props) => {
    return (
        <div>
            {props.kurssit.map(kurssi => {
                return (
                    <Kurssi key={kurssi.id} kurssi={kurssi} />
                )
            })}
        </div>
    )
}

export default App