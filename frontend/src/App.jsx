<<<<<<< HEAD
import { Route, Routes, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import DriverManagement from "./pages/DriverManagement";
import Maintenance from "./pages/Maintainance";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VehicleRegistry from './pages/feature/VehicleRegistry'
import SettingsRbac from './pages/feature/SettingsRbac'
import DriverManagement from './pages/feature/DriverManagement'
import Maintainance from './pages/feature/Maintainance'
import Dashboard from './pages/feature/Dashboard'
>>>>>>> 3692a9fb47ec7e5d7ef9861475d87f0deee37202

// Placeholder components for friend's pages - these will be replaced when friend creates them
const Trips = () => <div className="placeholder"><h1>Trips</h1><p>Page being created by team member</p></div>
const Fuel = () => <div className="placeholder"><h1>Fuel & Expenses</h1><p>Page being created by team member</p></div>
const Analytics = () => <div className="placeholder"><h1>Analytics</h1><p>Page being created by team member</p></div>

<<<<<<< HEAD
const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route element={<LayoutWithNavbar />}>
      <Route path="/drivers" element={<DriverManagement />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/maintainance" element={<Maintenance />} />
    </Route>
  </Routes>
);
=======
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/feature/dashboard" element={<Dashboard />} />
        <Route path="/feature/vehicleregistry" element={<VehicleRegistry />} />
        <Route path="/feature/drivers" element={<DriverManagement />} />
        <Route path="/feature/trips" element={<Trips />} />
        <Route path="/feature/maintenance" element={<Maintainance />} />
        <Route path="/feature/fuel" element={<Fuel />} />
        <Route path="/feature/analytics" element={<Analytics />} />
        <Route path="/feature/settings&rbac" element={<SettingsRbac />} />
      </Routes>
    </Router>
  )
}
>>>>>>> 3692a9fb47ec7e5d7ef9861475d87f0deee37202

export default App;
