import React from 'react'
import teach from '../assets/teach.png'

const Classed = [
    {   image:teach,
        name:"Manuella",
        cost:"$100",
        duration:'2 Hours'
    },
    {   image:teach,
        name:"Friend",
        cost:"$200",
        duration:'1 Hours'
    }
]

export default function Teacher(){
    return (
        <div className="teachers--content">
            <div className="list--header">
                <h2>Teachers</h2>
                <select name="" id="">
                    <option value="eng">English</option>
                    <option value="lug">Luganda</option>
                    <option value="chn">Chinese</option>
                </select>
            </div>
            <div className="list--container">
                {Classed.map(({image,name,cost,duration}) => (
                    <div className = "list">
                        <div className="teacher--details">
                            <img src={image} alt={name} />
                            <h2>{name}</h2>                        
                        </div>
                        <span>{duration}</span>
                        <span>{cost}</span>
                        <span className = "Todo" >..</span>
                    </div>
                ))}
            </div>
        </div>

    )
}