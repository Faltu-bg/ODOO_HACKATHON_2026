import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import DriverManagement from "./pages/DriverManagement"
import Maintenance from "./pages/Maintainance"

const App=()=>{
  return <div>
    <Navbar/>
    <Routes>
      <Route path='/drivers' element={<DriverManagement/>} />
      <Route path='/maintainance' element={<Maintenance />} />
    </Routes>
  </div>
}
export default App