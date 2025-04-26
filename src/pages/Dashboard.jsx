import ContentHeader from "../components/ContentHeader"
import Card from "../components/Cards"
import "../styles/content.css"

const Dashboard = () => {
  return (
    <div className="content">
      <ContentHeader title="Dashboard" />
      <Card />
    </div>
  )
}

export default Dashboard
