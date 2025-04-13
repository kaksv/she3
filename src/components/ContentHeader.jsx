
const ContentHeader = ({ title = "Home" }) => {
  return (
    <div className="content--header">
      <h1 className="header--title">{title}</h1>
    </div>
  )
}

export default ContentHeader
