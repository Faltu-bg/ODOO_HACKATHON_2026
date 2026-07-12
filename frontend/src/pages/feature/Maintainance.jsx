import { useState } from "react";
import { Link } from 'react-router-dom'
import { LayoutDashboard, Car, Users, MapPin, Wrench, Fuel, BarChart3, Settings, Search, User, Plus } from 'lucide-react'
import './Maintainance.css'

const Maintenance = () => {

  const [records,setRecords] = useState([
    {
      vehicle:"VAN-05",
      service:"Oil Change",
      cost:"2500",
      status:"In Shop"
    },
    {
      vehicle:"TRUCK-11",
      service:"Engine Repair",
      cost:"18000",
      status:"Completed"
    },
    {
      vehicle:"MINI-03",
      service:"Tyre Replace",
      cost:"6200",
      status:"In Shop"
    }
  ]);


  const statusColor = {
    "In Shop":"bg-yellow-600",
    "Completed":"bg-green-600"
  };


  return (
    <div className="page-layout maintenance">
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
          <Link to="/feature/drivers" className="nav-item">
            <Users size={18} />
            <span>Drivers</span>
          </Link>
          <Link to="/feature/trips" className="nav-item">
            <MapPin size={18} />
            <span>Trips</span>
          </Link>
          <Link to="/feature/maintenance" className="nav-item active">
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
            <h1>Maintenance</h1>
          </div>
          <div className="navbar-right">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>
            <div className="user-info">
              <User size={20} />
              <span className="user-name">John Doe</span>
              <span className="role-badge">Dispatcher</span>
            </div>
          </div>
        </div>

        <div className="content-area">
          <div className="content-header">
            <h2>Maintenance</h2>
          </div>

          <div className="maintenance-sections">
            <div className="maintenance-form-section">
              <h3>LOG SERVICE RECORD</h3>
              <div className="maintenance-form-card">
                <div className="form-row">
                  <div className="form-group">
                    <label>Vehicle</label>
                    <input placeholder="Vehicle" />
                  </div>
                  <div className="form-group">
                    <label>Service Type</label>
                    <input placeholder="Service Type" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Cost</label>
                    <input type="number" placeholder="Cost" />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input type="date" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select>
                    <option>Active</option>
                    <option>Completed</option>
                  </select>
                </div>
                <button className="save-btn">Save Record</button>

                <div className="rules">
                  <p className="rule-item">
                    <span className="rule-text">Available</span>
                    <span className="rule-arrow">→</span>
                    <span className="rule-text in-shop">In Shop</span>
                  </p>
                  <p className="rule-item">
                    <span className="rule-text in-shop">In Shop</span>
                    <span className="rule-arrow">→</span>
                    <span className="rule-text">Available</span>
                  </p>
                  <p className="rule-note">⚠️ Note: In Shop vehicles are removed from dispatch pool.</p>
                </div>
              </div>
            </div>

            <div className="service-log-section">
              <h3>SERVICE LOG</h3>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>VEHICLE</th>
                      <th>SERVICE</th>
                      <th>COST</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((item, index) => (
                      <tr key={index}>
                        <td>{item.vehicle}</td>
                        <td>{item.service}</td>
                        <td>₹{item.cost}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function getStatusClass(status) {
    switch (status) {
      case 'In Shop': return 'in-shop'
      case 'Completed': return 'completed'
      default: return ''
    }
  }
};


export default Maintenance;