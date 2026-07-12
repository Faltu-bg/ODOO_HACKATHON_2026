import { Route, Routes, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import DriverManagement from "./pages/DriverManagement";
import Maintenance from "./pages/Maintainance";
import Login from "./pages/LoginPage";

const LayoutWithNavbar = () => (
  <div>
    <Navbar />
    <Outlet /> {/* child routes render here */}
  </div>
);

const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route element={<LayoutWithNavbar />}>
      <Route path="/drivers" element={<DriverManagement />} />
      <Route path="/maintainance" element={<Maintenance />} />
    </Route>
  </Routes>
);

export default App;
