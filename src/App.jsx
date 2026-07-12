import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import DriverManagement from "./pages/DriverManagement"

const App=()=>{
  return <div>
    <Navbar/>
    <Routes>
      <Route path='/drivers' element={<DriverManagement/>} />
    </Routes>
  </div>
}
export default App