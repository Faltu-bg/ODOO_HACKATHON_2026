import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Car, Users, MapPin, Wrench, Fuel, BarChart3, Settings, Search, User, Bell, Plus, TrendingUp, TrendingDown, ChevronRight, Calendar, Filter } from 'lucide-react'
import './Dashboard.css'

function Dashboard() {
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('All')
  const [vehicleStatusFilter, setVehicleStatusFilter] = useState('All')
  const [regionFilter, setRegionFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  const kpiData = [
    { title: 'Active Vehicles', value: 45, icon: Car, color: '#2563EB', trend: '+12%', trendUp: true, borderColor: '#2563EB' },
    { title: 'Available Vehicles', value: 32, icon: Car, color: '#22C55E', trend: '+8%', trendUp: true, borderColor: '#22C55E' },
    { title: 'Vehicles in Maintenance', value: 8, icon: Wrench, color: '#F59E0B', trend: '-3%', trendUp: false, borderColor: '#F59E0B' },
    { title: 'Active Trips', value: 28, icon: MapPin, color: '#2563EB', trend: '+15%', trendUp: true, borderColor: '#2563EB' },
    { title: 'Pending Trips', value: 12, icon: MapPin, color: '#8B5CF6', trend: '+5%', trendUp: true, borderColor: '#8B5CF6' },
    { title: 'Drivers on Duty', value: 35, icon: Users, color: '#06B6D4', trend: '+10%', trendUp: true, borderColor: '#06B6D4' },
    { title: 'Fleet Utilization', value: '78%', icon: BarChart3, color: '#22C55E', trend: '+2%', trendUp: true, borderColor: '#22C55E' },
  ]

  const vehicleStatus = [
    { label: 'Available', value: 45, percentage: 45, color: '#22C55E' },
    { label: 'On Trip', value: 28, percentage: 28, color: '#2563EB' },
    { label: 'In Shop', value: 8, percentage: 8, color: '#F59E0B' },
    { label: 'Retired', value: 19, percentage: 19, color: '#EF4444' },
  ]

  const recentTrips = [
    { id: 'TRP-001', vehicle: 'KA-01-AB-1234', driver: 'John Doe', status: 'On Trip', eta: '2:30 PM' },
    { id: 'TRP-002', vehicle: 'KA-01-CD-5678', driver: 'Jane Smith', status: 'Completed', eta: 'Completed' },
    { id: 'TRP-003', vehicle: 'KA-01-EF-9012', driver: 'Bob Johnson', status: 'Dispatched', eta: '3:45 PM' },
    { id: 'TRP-004', vehicle: 'KA-01-GH-3456', driver: 'Alice Brown', status: 'Available', eta: 'Scheduled' },
    { id: 'TRP-005', vehicle: 'KA-01-IJ-7890', driver: 'Charlie Wilson', status: 'On Trip', eta: '4:15 PM' },
    { id: 'TRP-006', vehicle: 'KA-01-KL-1122', driver: 'Diana Lee', status: 'Completed', eta: 'Completed' },
    { id: 'TRP-007', vehicle: 'KA-01-MN-3344', driver: 'Edward King', status: 'Draft', eta: 'Pending' },
    { id: 'TRP-008', vehicle: 'KA-01-OP-5566', driver: 'Fiona Green', status: 'Cancelled', eta: 'Cancelled' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return '#22C55E'
      case 'On Trip': return '#2563EB'
      case 'Dispatched': return '#0EA5E9'
      case 'Completed': return '#22C55E'
      case 'Draft': return '#64748B'
      case 'Cancelled': return '#EF4444'
      default: return '#64748B'
    }
  }

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const filteredTrips = recentTrips.filter(trip => 
    trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.driver.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="page-layout dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <Car size={24} className="logo-icon" />
            <span className="logo-text">TransitOps</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <Link to="/feature/dashboard" className="nav-item active">
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
            <h1>Dashboard</h1>
          </div>
          <div className="navbar-right">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            <div className="user-info">
              <User size={20} />
              <span className="user-name">John Doe</span>
              <span className="role-badge">Fleet Manager</span>
            </div>
          </div>
        </div>

        <div className="content-area">
          <div className="dashboard-filters">
            <div className="filter-group">
              <label>Vehicle Type</label>
              <select value={vehicleTypeFilter} onChange={(e) => setVehicleTypeFilter(e.target.value)}>
                <option value="All">All Types</option>
                <option value="Car">Car</option>
                <option value="Van">Van</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Vehicle Status</label>
              <select value={vehicleStatusFilter} onChange={(e) => setVehicleStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="On Trip">On Trip</option>
                <option value="In Shop">In Shop</option>
                <option value="Retired">Retired</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Region</label>
              <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
                <option value="All">All Regions</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Date Range</label>
              <div className="date-picker">
                <Calendar size={16} className="calendar-icon" />
                <select>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>Custom Range</option>
                </select>
              </div>
            </div>
          </div>

          <div className="kpi-grid">
            {kpiData.map((kpi, index) => {
              const Icon = kpi.icon
              return (
                <div key={index} className="kpi-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="kpi-card-left" style={{ borderLeftColor: kpi.borderColor }}>
                    <div className="kpi-icon" style={{ backgroundColor: `${kpi.color}15`, color: kpi.color }}>
                      <Icon size={24} />
                    </div>
                    <div className="kpi-metrics">
                      <div className="kpi-value">{kpi.value}</div>
                      <div className="kpi-title">{kpi.title}</div>
                    </div>
                  </div>
                  <div className="kpi-trend">
                    {kpi.trendUp ? (
                      <TrendingUp size={16} className="trend-icon up" />
                    ) : (
                      <TrendingDown size={16} className="trend-icon down" />
                    )}
                    <span className={`trend-value ${kpi.trendUp ? 'up' : 'down'}`}>{kpi.trend}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="dashboard-sections">
            <div className="vehicle-status-section">
              <div className="section-header">
                <h3>Vehicle Status Distribution</h3>
              </div>
              <div className="status-bars">
                {vehicleStatus.map((status, index) => (
                  <div key={index} className="status-bar-item">
                    <div className="status-bar-header">
                      <span className="status-label">{status.label}</span>
                      <span className="status-value">{status.value} ({status.percentage}%)</span>
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${status.percentage}%`, 
                          backgroundColor: status.color,
                          animationDelay: `${index * 0.2}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="recent-trips-section">
              <div className="section-header">
                <h3>Recent Trips</h3>
                <div className="table-actions">
                  <div className="table-search">
                    <Search size={16} className="search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search trips..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="filter-btn">
                    <Filter size={16} />
                  </button>
                </div>
              </div>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleSort('id')} className="sortable">
                        Trip ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th onClick={() => handleSort('vehicle')} className="sortable">
                        Vehicle {sortConfig.key === 'vehicle' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th onClick={() => handleSort('driver')} className="sortable">
                        Driver {sortConfig.key === 'driver' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th onClick={() => handleSort('status')} className="sortable">
                        Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th onClick={() => handleSort('eta')} className="sortable">
                        ETA {sortConfig.key === 'eta' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTrips.map((trip, index) => (
                      <tr key={index} style={{ animationDelay: `${index * 0.05}s` }}>
                        <td className="trip-id">{trip.id}</td>
                        <td className="vehicle-reg">{trip.vehicle}</td>
                        <td className="driver-name">{trip.driver}</td>
                        <td>
                          <span 
                            className="status-badge" 
                            style={{ 
                              backgroundColor: `${getStatusColor(trip.status)}20`, 
                              color: getStatusColor(trip.status) 
                            }}
                          >
                            {trip.status}
                          </span>
                        </td>
                        <td className="eta">{trip.eta}</td>
                        <td>
                          <button className="action-btn">
                            View <ChevronRight size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-pagination">
                <button className="pagination-btn" disabled>Previous</button>
                <span className="page-numbers">
                  <button className="page-number active">1</button>
                  <button className="page-number">2</button>
                  <button className="page-number">3</button>
                </span>
                <button className="pagination-btn">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
