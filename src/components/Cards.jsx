import React from 'react'
// import {BiLogoHtml5, BiLogoAndroid, BiBuilding} from 'react-icons/bi'

const Class = [
    {
        title: 'Web Development',
        duration:'||||', 
        icon: "..." //<BiLogoHtml5 />
    },

    {   title: 'App Development',
        duration: '2 Hours',
        icon: "..." //<BiLogoAndroid />
    },
    {
        title: 'UI & UX',
        duration: '2 Hours',
        icon: "..." //<BiBuilding />     
    }

];

const Card = () =>{

    return(
        <div className="card--container">
            {
                Class.map(({title,icon,duration})=>(
                    <div className="card">
                        <div className="card--cover">{icon}</div>
                        <div className="cards--title">
                            <h3>{title}</h3>
                            {title=="Web Development" ? <h5 className="dot time">{duration}</h5> : <h5 className='time'>{duration}</h5>   }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Card

