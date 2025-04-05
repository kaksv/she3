import React from 'react'

const ContentHeader = ({ title = "Dashboard" })=>{
    return(
        <div className="content--header">  
            <h1 className="header--title">{title}</h1>
            <div className="header--activity">
                <div className="search-box">
                     <input type="text" placeholder="Search your future..." />
                </div>
                <div className="notify">
                </div>
            </div>
        </div>
    )
}

export default ContentHeader