import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Car, Users, MapPin, Wrench, Fuel, BarChart3, Settings, Search, User, Bell, Plus, TrendingUp, TrendingDown, ChevronRight, Calendar, Filter } from 'lucide-react'

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

  const getStatusTailwindClass = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700'
      case 'On Trip': return 'bg-blue-100 text-blue-700'
      case 'Dispatched': return 'bg-sky-100 text-sky-700'
      case 'Completed': return 'bg-green-100 text-green-700'
      case 'Draft': return 'bg-gray-100 text-gray-700'
      case 'Cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
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
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Car size={24} className="text-orange-500" />
            <span className="text-xl font-semibold text-gray-800">TransitOps</span>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <Link to="/feature/dashboard" className="flex items-center gap-3 px-4 py-3 bg-orange-500 text-white rounded-lg">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/feature/vehicleregistry" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Car size={18} />
            <span>Fleet</span>
          </Link>
          <Link to="/feature/drivers" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Users size={18} />
            <span>Drivers</span>
          </Link>
          <Link to="/feature/trips" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <MapPin size={18} />
            <span>Trips</span>
          </Link>
          <Link to="/feature/maintenance" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Wrench size={18} />
            <span>Maintenance</span>
          </Link>
          <Link to="/feature/fuel" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Fuel size={18} />
            <span>Fuel & Expenses</span>
          </Link>
          <Link to="/feature/analytics" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <BarChart3 size={18} />
            <span>Analytics</span>
          </Link>
          <Link to="/feature/settings&rbac" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64" />
            </div>
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-2">
              <User size={20} className="text-gray-600" />
              <span className="text-gray-700 font-medium">John Doe</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">Fleet Manager</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Vehicle Type</label>
              <select value={vehicleTypeFilter} onChange={(e) => setVehicleTypeFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="All">All Types</option>
                <option value="Car">Car</option>
                <option value="Van">Van</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Vehicle Status</label>
              <select value={vehicleStatusFilter} onChange={(e) => setVehicleStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="On Trip">On Trip</option>
                <option value="In Shop">In Shop</option>
                <option value="Retired">Retired</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Region</label>
              <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="All">All Regions</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Date Range</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>Custom Range</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {kpiData.map((kpi, index) => {
              const Icon = kpi.icon
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: `${kpi.color}15`, color: kpi.color }}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                        <div className="text-sm text-gray-600">{kpi.title}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {kpi.trendUp ? (
                        <TrendingUp size={16} className="text-green-600" />
                      ) : (
                        <TrendingDown size={16} className="text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${kpi.trendUp ? 'text-green-600' : 'text-red-600'}`}>{kpi.trend}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Vehicle Status Distribution</h3>
                <div className="space-y-4">
                  {vehicleStatus.map((status, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{status.label}</span>
                        <span className="text-sm text-gray-600">{status.value} ({status.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300" 
                          style={{ 
                            width: `${status.percentage}%`, 
                            backgroundColor: status.color
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Trips</h3>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search trips..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
                      />
                    </div>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Filter size={16} />
                    </button>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th onClick={() => handleSort('id')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                          Trip ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('vehicle')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                          Vehicle {sortConfig.key === 'vehicle' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('driver')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                          Driver {sortConfig.key === 'driver' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('status')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                          Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('eta')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                          ETA {sortConfig.key === 'eta' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredTrips.map((trip, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-mono font-semibold text-gray-900">{trip.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{trip.vehicle}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{trip.driver}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusTailwindClass(trip.status)}`}>
                              {trip.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{trip.eta}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm font-medium">
                              View <ChevronRight size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>Previous</button>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">2</button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">3</button>
                  </div>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
