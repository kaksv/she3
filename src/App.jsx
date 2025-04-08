import Sidebar from "./components/Sidebar"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Assignments from "./pages/Assignments"
import Reports from "./pages/Reports"
import Stats from "./pages/Stats"
import Messages from "./pages/Messages"
import Help from "./pages/Help"

const App = () => {
  return (
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
        </Routes>
        {/* <Profile /> */}
      </div>
    </div>
  )
}

export default App
