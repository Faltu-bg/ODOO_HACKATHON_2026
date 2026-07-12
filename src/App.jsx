import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import DriverManagement from "./pages/DriverManagement"
import Maintenance from "./pages/Maintainance"
import Settings from "./pages/Settings"

const App=()=>{
  return <div>
    <Navbar/>
    <Routes>
      <Route path='/drivers' element={<DriverManagement/>} />
      <Route path='/maintainance' element={<Maintenance />} />
      <Route path='/settings' element={<Settings />} />
    </Routes>
  </div>
}
export default App