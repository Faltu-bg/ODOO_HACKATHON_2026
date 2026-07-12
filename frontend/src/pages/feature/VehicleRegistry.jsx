import { useState } from 'react'
import { Link } from 'react-router-dom'
import './VehicleRegistry.css'

function VehicleRegistry() {
  const [vehicles] = useState([
    { id: 1, regNo: 'KA-01-AB-1234', nameModel: 'Toyota Innova', type: 'Van', capacity: 7, odometer: 45000, acqCost: 1500000, status: 'Available' },
    { id: 2, regNo: 'KA-01-CD-5678', nameModel: 'Maruti Swift', type: 'Car', capacity: 4, odometer: 32000, acqCost: 800000, status: 'On Trip' },
    { id: 3, regNo: 'KA-01-EF-9012', nameModel: 'Tata Ace', type: 'Truck', capacity: 2, odometer: 67000, acqCost: 600000, status: 'In Shop' },
    { id: 4, regNo: 'KA-01-GH-3456', nameModel: 'Honda City', type: 'Car', capacity: 4, odometer: 89000, acqCost: 1200000, status: 'Retired' },
  ])

  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchRegNo, setSearchRegNo] = useState('')
  const [generalSearch, setGeneralSearch] = useState('')

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchType = typeFilter === 'All' || vehicle.type === typeFilter
    const matchStatus = statusFilter === 'All' || vehicle.status === statusFilter
    const matchRegNo = searchRegNo === '' || vehicle.regNo.toLowerCase().includes(searchRegNo.toLowerCase())
    const matchGeneral = generalSearch === '' || 
      vehicle.regNo.toLowerCase().includes(generalSearch.toLowerCase()) ||
      vehicle.nameModel.toLowerCase().includes(generalSearch.toLowerCase())
    return matchType && matchStatus && matchRegNo && matchGeneral
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'green'
      case 'On Trip': return 'blue'
      case 'In Shop': return 'orange'
      case 'Retired': return 'red'
      default: return 'gray'
    }
  }

  return (
    <div className="vehicle-registry">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Fleet Management</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/feature/dashboard" className="nav-item">Dashboard</Link>
          <Link to="/feature/vehicleregistry" className="nav-item active">Fleet</Link>
          <Link to="/feature/drivers" className="nav-item">Drivers</Link>
          <Link to="/feature/trips" className="nav-item">Trips</Link>
          <Link to="/feature/maintenance" className="nav-item">Maintenance</Link>
          <Link to="/feature/fuel" className="nav-item">Fuel & Expenses</Link>
          <Link to="/feature/analytics" className="nav-item">Analytics</Link>
          <Link to="/feature/settings&rbac" className="nav-item">Settings</Link>
        </nav>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Vehicle Registry</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={generalSearch}
              onChange={(e) => setGeneralSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filters">
          <div className="filter-group">
            <label>Type:</label>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
              <option value="Truck">Truck</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Available">Available</option>
              <option value="On Trip">On Trip</option>
              <option value="In Shop">In Shop</option>
              <option value="Retired">Retired</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Search reg. no:</label>
            <input
              type="text"
              placeholder="Search reg. no..."
              value={searchRegNo}
              onChange={(e) => setSearchRegNo(e.target.value)}
            />
          </div>
          <button className="add-vehicle-btn">+ Add Vehicle</button>
        </div>

        <div className="rule">
          <p>⚠️ Registration No. must be unique. Retired/In Shop vehicles are hidden from Trip Dispatcher</p>
        </div>

        <div className="table-container">
          <table className="vehicles-table">
            <thead>
              <tr>
                <th>REG. NO. (UNIQUE)</th>
                <th>NAME/MODEL</th>
                <th>TYPE</th>
                <th>CAPACITY</th>
                <th>ODOMETER</th>
                <th>ACQ. COST</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map(vehicle => (
                <tr key={vehicle.id}>
                  <td>{vehicle.regNo}</td>
                  <td>{vehicle.nameModel}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.capacity}</td>
                  <td>{vehicle.odometer.toLocaleString()} km</td>
                  <td>₹{vehicle.acqCost.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default VehicleRegistry
