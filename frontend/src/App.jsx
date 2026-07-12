import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/feature/Login'
import VehicleRegistry from './pages/feature/VehicleRegistry'
import SettingsRbac from './pages/feature/SettingsRbac'
import DriverManagement from './pages/feature/DriverManagement'
import Maintainance from './pages/feature/Maintainance'
import Dashboard from './pages/feature/Dashboard'
import TripDispatcher from './pages/feature/TripDispatcher'
import FuelExpenses from './pages/feature/FuelExpenses'

// Placeholder components for friend's pages - these will be replaced when friend creates them
const Analytics = () => <div className="placeholder"><h1>Analytics</h1><p>Page being created by team member</p></div>

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feature/dashboard" element={<Dashboard />} />
        <Route path="/feature/vehicleregistry" element={<VehicleRegistry />} />
        <Route path="/feature/drivers" element={<DriverManagement />} />
        <Route path="/feature/trips" element={<TripDispatcher />} />
        <Route path="/feature/maintenance" element={<Maintainance />} />
        <Route path="/feature/fuel" element={<FuelExpenses />} />
        <Route path="/feature/analytics" element={<Analytics />} />
        <Route path="/feature/settings&rbac" element={<SettingsRbac />} />
      </Routes>
    </Router>
  )
}

export default App
