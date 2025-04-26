import Sidebar from "./components/Sidebar"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Assignments from "./pages/Activities"
import Reports from "./pages/Reports"
import Stats from "./pages/Stats"
import Messages from "./pages/Messages"
import Help from "./pages/Help"
import Donate from "./pages/Donate"
import Footer from "./components/Footer"

const App = () => {
  return (
    <div className="collection">
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard--content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/help" element={<Help />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
          {/* <Profile /> */}
        </div>
      </div>

      <div className="footer-content">
        <Footer />
      </div>
    </div>
  )
}

export default App
