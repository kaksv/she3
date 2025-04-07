import React from 'react'
import teach from '../assets/teach.png' 
// import {BiLogoHtml5, BiLogoAndroid, BiBuilding} from 'react-icons/bi'

const Class = [
    {
        image: teach,
        title:'Educate', 
        explain: "Equipping women with skills, knowledge, and confidence to thrive in Web3"
    },

    {   image: teach,
        title: 'Collaborate',
        explain: "Fostering partnerships and teamwork among women, Web3 experts, and organizations to share knowledge, resources, and opportunities"
    },
    {
        image: teach,
        title: 'Innovate',
        explain: "Encouraging women to create new ideas, solutions, and technologies within the Web3 ecosystem"     
    }

];

const Card = () =>{

    return(
        <div className="card--container">

            <div className="empower">
                <h1>Empowering African women to lead and innovate in Web3 through education, collaboration, and community</h1>
                <p>Through this initiative, She3 aims to equip women with the skills and networks they need to take on leadership roles and drive meaningful change in the Web3 ecosystem.
                </p>
            </div>
            
            <div className="cards--header">
                <h1>Our Mission</h1>
            </div>
            <div className = "Cards">
            {
                Class.map(({image,title,explain})=>(
                    <div className="card">
                        <img src={image} className="card--img" />
                        <div className="card--text">
                            <h3>{title}</h3>
                            <p>{explain}</p>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Card

