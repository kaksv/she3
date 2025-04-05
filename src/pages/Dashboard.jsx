import React from 'react'
import ContentHeader from '../components/ContentHeader'
import Card from '../components/Cards'
import Teacher from '../components/Teachers'
import '../styles/content.css'

const Dashboard = () => {
    return (
        <div className="content">
            <ContentHeader />
            <Card />
            <Teacher />
        </div>
    )
}

export default Dashboard