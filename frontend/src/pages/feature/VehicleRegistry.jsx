import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Car, Users, MapPin, Wrench, Fuel, BarChart3, Settings, Search, User, Plus } from 'lucide-react'
import './VehicleRegistry.css'

function VehicleRegistry() {
  const [vehicles] = useState([
    { id: 1, regNo: 'KA-01-AB-1234', nameModel: 'Toyota Innova', type: 'Van', capacity: 7, odometer: 45000, acqCost: 1500000, status: 'Available', lastService: '2024-06-15' },
    { id: 2, regNo: 'KA-01-CD-5678', nameModel: 'Maruti Swift', type: 'Car', capacity: 4, odometer: 32000, acqCost: 800000, status: 'On Trip', lastService: '2024-06-20' },
    { id: 3, regNo: 'KA-01-EF-9012', nameModel: 'Tata Ace', type: 'Truck', capacity: 2, odometer: 67000, acqCost: 600000, status: 'In Shop', lastService: '2024-07-01' },
    { id: 4, regNo: 'KA-01-GH-3456', nameModel: 'Honda City', type: 'Car', capacity: 4, odometer: 89000, acqCost: 1200000, status: 'Retired', lastService: '2024-05-10' },
    { id: 5, regNo: 'KA-01-IJ-7890', nameModel: 'Mahindra XUV', type: 'SUV', capacity: 6, odometer: 25000, acqCost: 1800000, status: 'Available', lastService: '2024-06-25' },
    { id: 6, regNo: 'KA-01-KL-1122', nameModel: 'Ford Ecosport', type: 'SUV', capacity: 5, odometer: 41000, acqCost: 1100000, status: 'On Trip', lastService: '2024-06-18' },
  ])

  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchRegNo, setSearchRegNo] = useState('')
  const [generalSearch, setGeneralSearch] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = vehicles.filter(vehicle => {
      const matchType = typeFilter === 'All' || vehicle.type === typeFilter
      const matchStatus = statusFilter === 'All' || vehicle.status === statusFilter
      const matchRegNo = searchRegNo === '' || vehicle.regNo.toLowerCase().includes(searchRegNo.toLowerCase())
      const matchGeneral = generalSearch === '' || 
        vehicle.regNo.toLowerCase().includes(generalSearch.toLowerCase()) ||
        vehicle.nameModel.toLowerCase().includes(generalSearch.toLowerCase())
      return matchType && matchStatus && matchRegNo && matchGeneral
    })

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [vehicles, typeFilter, statusFilter, searchRegNo, generalSearch, sortConfig])

  const paginatedVehicles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedVehicles.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedVehicles, currentPage])

  const totalPages = Math.ceil(filteredAndSortedVehicles.length / itemsPerPage)

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const resetFilters = () => {
    setTypeFilter('All')
    setStatusFilter('All')
    setSearchRegNo('')
    setGeneralSearch('')
    setSortConfig({ key: null, direction: 'asc' })
    setCurrentPage(1)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return '#22C55E'
      case 'On Trip': return '#2563EB'
      case 'In Shop': return '#F59E0B'
      case 'Retired': return '#EF4444'
      default: return '#64748B'
    }
  }

  return (
    <div className="page-layout vehicle-registry">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Fleet Management</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/feature/dashboard" className="nav-item">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/feature/vehicleregistry" className="nav-item active">
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
            <h1>Vehicle Registry</h1>
          </div>
          <div className="navbar-right">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={generalSearch}
                onChange={(e) => setGeneralSearch(e.target.value)}
              />
            </div>
            <div className="user-info">
              <User size={20} />
              <span className="user-name">John Doe</span>
              <span className="role-badge">Dispatcher</span>
            </div>
          </div>
        </div>

        <div className="content-area">
          <div className="filters">
            <div className="filter-group">
              <label>Type:</label>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Car">Car</option>
                <option value="Van">Van</option>
                <option value="SUV">SUV</option>
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
            <button className="reset-btn" onClick={resetFilters}>Reset Filters</button>
            <button className="add-vehicle-btn">
              <Plus size={16} />
              Add Vehicle
            </button>
          </div>

          <div className="stats-bar">
            <span className="stat-item">Total: {filteredAndSortedVehicles.length} vehicles</span>
            <span className="stat-item">Page {currentPage} of {totalPages}</span>
          </div>

          <div className="rule">
            <p>⚠️ Registration No. must be unique. Retired/In Shop vehicles are hidden from Trip Dispatcher</p>
          </div>

          <div className="table-container">
            <table className="vehicles-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('regNo')} className="sortable">
                    REG. NO. {sortConfig.key === 'regNo' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('nameModel')} className="sortable">
                    NAME/MODEL {sortConfig.key === 'nameModel' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('type')} className="sortable">
                    TYPE {sortConfig.key === 'type' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('capacity')} className="sortable">
                    CAPACITY {sortConfig.key === 'capacity' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('odometer')} className="sortable">
                    ODOMETER {sortConfig.key === 'odometer' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('acqCost')} className="sortable">
                    ACQ. COST {sortConfig.key === 'acqCost' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('status')} className="sortable">
                    STATUS {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedVehicles.map(vehicle => (
                  <tr key={vehicle.id}>
                    <td className="reg-no">{vehicle.regNo}</td>
                    <td className="name-model">{vehicle.nameModel}</td>
                    <td>{vehicle.type}</td>
                    <td>{vehicle.capacity} seats</td>
                    <td>{vehicle.odometer.toLocaleString()} km</td>
                    <td>₹{vehicle.acqCost.toLocaleString()}</td>
                    <td>
                      <span className="status-badge" style={{ backgroundColor: `${getStatusColor(vehicle.status)}20`, color: getStatusColor(vehicle.status) }}>
                        {vehicle.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-btn" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="page-info">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`page-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </span>
                <button 
                  className="pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleRegistry
