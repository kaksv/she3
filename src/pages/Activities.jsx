import ContentHeader from "../components/ContentHeader"
import Programs from "../components/Programs"

const Assignments = () => {
  return (
    <div className="content">
      <ContentHeader title="Activities" />
      <div className="empower" style={{ marginTop: "1rem" }}>
        <h1>Activities</h1>
        <p>This is where assignments will be displayed. Coming soon!</p>
        <Programs />
      </div>
    </div>
  )
}

export default Assignments
