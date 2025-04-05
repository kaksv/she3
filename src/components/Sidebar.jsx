import React from 'react'
// import {BiHome, BiBookAlt, BiMessage, BiSolidReport, BiStats, BiTask, BiBook, BiHelpCircle} from 'react-icons/bi'
import '../styles/sidebar.css'
import IMG from '../assets/She3Logo.png'

const Sidebar = () => {

    return (
        <div className = 'menu'>
            <div className="logo">
                <img className='logo-icon' src={IMG} />
                <h2>She 3 Africa</h2>
            </div>

            <div className="menu--list">
                <a href="#" className="item">
                    {/* <BiHome className='icon'/> */}
                    Dashboard
                </a>
                <a href="#" className="item">
                    {/* <BiTask className='icon'/> */}
                    Assignment
                </a>
                <a href="#" className="item">
                    {/* <BiSolidReport className='icon'/> */}
                    Report
                </a>
                <a href="#" className="item">
                    {/* <BiStats className='icon'/> */}
                    Stats
                </a>
                <a href="#" className="item">
                    {/* <BiMessage className='icon'/> */}
                    Message
                </a>
                <a href="#" className="item">
                    {/* <BiHelpCircle className='icon'/> */}
                    Help
                </a>
            </div>
        </div>
    )
}

export default Sidebar