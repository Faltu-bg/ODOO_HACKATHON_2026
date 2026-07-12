import { useState } from "react";
import { Link } from 'react-router-dom'
import { LayoutDashboard, Car, Users, MapPin, Wrench, Fuel, BarChart3, Settings, Search, User, Plus } from 'lucide-react'
import './DriverManagement.css'

const DriverManagement = () => {
    const [showModal,setShowModal] = useState(false);

  const drivers = [
    {
      name: "Alex",
      license: "DL-88213",
      category: "LMV",
      expiry: "12/2038",
      contact: "98765xxxxx",
      score: "96%",
      status: "Available"
    },
    {
      name: "John",
      license: "DL-44120",
      category: "HMV",
      expiry: "03/2025 EXPIRED",
      contact: "98230xxxxx",
      score: "81%",
      status: "Suspended"
    },
    {
      name: "Priya",
      license: "DL-77031",
      category: "LMV",
      expiry: "08/2032",
      contact: "99110xxxxx",
      score: "99%",
      status: "On Trip"
    },
    {
      name: "Suresh",
      license: "DL-90045",
      category: "HMV",
      expiry: "01/2027",
      contact: "97440xxxxx",
      score: "88%",
      status: "Off Duty"
    }
  ];


  const statusStyle = {
    Available: "bg-green-500",
    "On Trip": "bg-blue-500",
    Suspended: "bg-orange-500",
    "Off Duty": "bg-gray-500"
  };


  return (
    <div className="page-layout driver-management">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Fleet Management</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/feature/dashboard" className="nav-item">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/feature/vehicleregistry" className="nav-item">
            <Car size={18} />
            <span>Fleet</span>
          </Link>
          <Link to="/feature/drivers" className="nav-item active">
            <Users size={18} />
            <span>Drivers</span>
          </Link>
          <Link to="/feature/trips" className="nav-item">
            <MapPin size={18} />
            <span>Trips</span>
          </Link>
          <Link to="/feature/maintenance" className="nav-item">
            <Wrench size={18} />
            <span>Maintenance</span>
          </Link>
          <Link to="/feature/fuel" className="nav-item">
            <Fuel size={18} />
            <span>Fuel & Expenses</span>
          </Link>
          <Link to="/feature/analytics" className="nav-item">
            <BarChart3 size={18} />
            <span>Analytics</span>
          </Link>
          <Link to="/feature/settings&rbac" className="nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      <div className="main-content">
        <div className="top-navbar">
          <div className="navbar-left">
            <h1>Driver Management</h1>
          </div>
          <div className="navbar-right">
            <div className="user-info">
              <User size={20} />
              <span className="user-name">John Doe</span>
              <span className="role-badge">Dispatcher</span>
            </div>
          </div>
        </div>

        <div className="content-area">
          <div className="content-header">
            <h2>Driver Management</h2>
            <button
              onClick={()=>setShowModal(true)}
              className="add-btn"
            >
              <Plus size={16} />
              Add Driver
            </button>
          </div>

          <div className="filters">
            <input
              type="text"
              placeholder="Search driver..."
              className="search-input"
            />
            <select className="filter-select">
              <option>All Status</option>
              <option>Available</option>
              <option>On Trip</option>
              <option>Suspended</option>
              <option>Off Duty</option>
            </select>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>DRIVER</th>
                  <th>LICENSE NO</th>
                  <th>CATEGORY</th>
                  <th>EXPIRY</th>
                  <th>CONTACT</th>
                  <th>SAFETY SCORE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver, index) => (
                  <tr key={index}>
                    <td className="driver-name">{driver.name}</td>
                    <td className="license-no">{driver.license}</td>
                    <td>{driver.category}</td>
                    <td className={driver.expiry.includes("EXPIRED") ? "expired" : ""}>
                      {driver.expiry}
                    </td>
                    <td>{driver.contact}</td>
                    <td>{driver.score}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(driver.status)}`}>
                        {driver.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn edit">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rule">
            <p>⚠️ Rule: Expired license or Suspended driver cannot be assigned to trips.</p>
          </div>
        </div>
      </div>
    </div>
  );

  function getStatusClass(status) {
    switch (status) {
      case 'Available': return 'active'
      case 'On Trip': return 'on-trip'
      case 'Suspended': return 'suspended'
      case 'Off Duty': return 'off-duty'
      default: return ''
    }
  }
};


export default DriverManagement;