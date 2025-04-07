import React from 'react'
import ContentHeader from '../components/ContentHeader'
import Card from '../components/Cards'
import Programs from '../components/Programs'
import '../styles/content.css'

const Dashboard = () => {
    return (
        <div className="content">
            <ContentHeader />
            <Card />
            <Programs />
        </div>
    )
}

export default Dashboard