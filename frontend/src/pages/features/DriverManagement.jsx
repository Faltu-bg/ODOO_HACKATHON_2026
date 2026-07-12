import { useState } from "react";
import { Link } from 'react-router-dom'
import { LayoutDashboard, Car, Users, MapPin, Wrench, Fuel, BarChart3, Settings, Search, User, Plus } from 'lucide-react'

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
          <Link to="/feature/vehicleregistry" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Car size={18} />
            <span>Fleet</span>
          </Link>
          <Link to="/feature/drivers" className="flex items-center gap-3 px-4 py-3 bg-orange-500 text-white rounded-lg">
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
            <h1 className="text-2xl font-semibold text-gray-800">Driver Management</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <User size={20} className="text-gray-600" />
              <span className="text-gray-700 font-medium">John Doe</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">Dispatcher</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Driver Management</h2>
            <button
              onClick={()=>setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              Add Driver
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search driver..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]">
              <option>All Status</option>
              <option>Available</option>
              <option>On Trip</option>
              <option>Suspended</option>
              <option>Off Duty</option>
            </select>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DRIVER</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LICENSE NO</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CATEGORY</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EXPIRY</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CONTACT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SAFETY SCORE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {drivers.map((driver, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{driver.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono font-semibold text-gray-900">{driver.license}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{driver.category}</td>
                    <td className={`px-6 py-4 whitespace-nowrap ${driver.expiry.includes("EXPIRED") ? "text-red-600 font-medium" : "text-gray-700"}`}>
                      {driver.expiry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{driver.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{driver.score}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusTailwindClass(driver.status)}`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm font-medium">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-orange-800 font-medium">⚠️ Rule: Expired license or Suspended driver cannot be assigned to trips.</p>
          </div>
        </div>
      </div>
    </div>
  );

  function getStatusTailwindClass(status) {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700'
      case 'On Trip': return 'bg-blue-100 text-blue-700'
      case 'Suspended': return 'bg-yellow-100 text-yellow-700'
      case 'Off Duty': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }
};


export default DriverManagement;