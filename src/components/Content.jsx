import React from 'react'
import ContentHeader from './ContentHeader'
import Card from './Cards'
import Teacher from './Teachers'
import '../styles/content.css'

const Content = () => {
    return (
        <div className="content">
            <ContentHeader />
            <Card />
            <Teacher />

        </div>
    
    )
}

export default Content