import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Car, Users, MapPin, Wrench, Fuel, BarChart3, Settings, Search, User, Plus } from 'lucide-react'

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

  const getStatusTailwindClass = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700'
      case 'On Trip': return 'bg-blue-100 text-blue-700'
      case 'In Shop': return 'bg-yellow-100 text-yellow-700'
      case 'Retired': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Fleet Management</h2>
        </div>
        <nav className="flex-1 p-4">
          <Link to="/feature/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/feature/vehicleregistry" className="flex items-center gap-3 px-4 py-3 bg-orange-500 text-white rounded-lg">
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
            <h1 className="text-2xl font-semibold text-gray-800">Vehicle Registry</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={generalSearch}
                onChange={(e) => setGeneralSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <User size={20} className="text-gray-600" />
              <span className="text-gray-700 font-medium">John Doe</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">Dispatcher</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Type:</label>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="All">All</option>
                <option value="Car">Car</option>
                <option value="Van">Van</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Status:</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="All">All</option>
                <option value="Available">Available</option>
                <option value="On Trip">On Trip</option>
                <option value="In Shop">In Shop</option>
                <option value="Retired">Retired</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Search reg. no:</label>
              <input
                type="text"
                placeholder="Search reg. no..."
                value={searchRegNo}
                onChange={(e) => setSearchRegNo(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
              />
            </div>
            <button onClick={resetFilters} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Reset Filters</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={16} />
              Add Vehicle
            </button>
          </div>

          <div className="flex gap-6 mb-6 text-gray-600">
            <span className="font-medium">Total: {filteredAndSortedVehicles.length} vehicles</span>
            <span className="font-medium">Page {currentPage} of {totalPages}</span>
          </div>

          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-orange-800 font-medium">⚠️ Registration No. must be unique. Retired/In Shop vehicles are hidden from Trip Dispatcher</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th onClick={() => handleSort('regNo')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    REG. NO. {sortConfig.key === 'regNo' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('nameModel')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    NAME/MODEL {sortConfig.key === 'nameModel' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('type')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    TYPE {sortConfig.key === 'type' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('capacity')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    CAPACITY {sortConfig.key === 'capacity' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('odometer')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    ODOMETER {sortConfig.key === 'odometer' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('acqCost')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    ACQ. COST {sortConfig.key === 'acqCost' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('status')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                    STATUS {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedVehicles.map(vehicle => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono font-semibold text-gray-900">{vehicle.regNo}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{vehicle.nameModel}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{vehicle.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{vehicle.capacity} seats</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{vehicle.odometer.toLocaleString()} km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">₹{vehicle.acqCost.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusTailwindClass(vehicle.status)}`}>
                        {vehicle.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                <button 
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button 
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
