import { NavLink } from "react-router-dom"
import "../styles/sidebar.css"
import IMG from "../assets/She3Logo.png"

const Sidebar = () => {
  return (
    <div className="menu">
      <div className="logo">
        <img className="logo-icon" src={IMG} alt="She3 Logo" />
        <h2>She 3 Africa</h2>
      </div>

      <div className="menu--list">
        <NavLink to="/" className={({ isActive }) => (isActive ? "item active" : "item")}>
          Home
        </NavLink>
        <NavLink to="/assignments" className={({ isActive }) => (isActive ? "item active" : "item")}>
          Activities
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => (isActive ? "item active" : "item")}>
          Roadmap
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => (isActive ? "item active" : "item")}>
          Team
        </NavLink>
        <NavLink to="/messages" className={({ isActive }) => (isActive ? "item active" : "item")}>
          Updates
        </NavLink>
        <NavLink to="/help" className={({ isActive }) => (isActive ? "item active" : "item")}>
          Contact Info
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
