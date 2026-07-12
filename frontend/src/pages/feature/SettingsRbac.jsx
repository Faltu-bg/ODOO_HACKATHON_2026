import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Car, Users, MapPin, Wrench, Fuel, BarChart3, Settings, Search, User, Plus } from 'lucide-react'
import './SettingsRbac.css'

function SettingsRbac() {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-07-10' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active', lastLogin: '2024-07-11' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Driver', status: 'Active', lastLogin: '2024-07-09' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Dispatcher', status: 'Inactive', lastLogin: '2024-06-15' },
  ])

  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['Full Access', 'User Management', 'System Settings', 'View All Reports'], description: 'Full system access' },
    { id: 2, name: 'Manager', permissions: ['Fleet Management', 'Driver Management', 'Trip Management', 'View Analytics'], description: 'Manage fleet and operations' },
    { id: 3, name: 'Dispatcher', permissions: ['Trip Assignment', 'View Vehicles', 'View Drivers', 'Update Trip Status'], description: 'Dispatch and coordinate trips' },
    { id: 4, name: 'Driver', permissions: ['View Assigned Trips', 'Update Trip Status', 'View Own Schedule'], description: 'Driver-specific access' },
  ])

  const [settings, setSettings] = useState({
    companyName: 'Fleet Management Co.',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    currency: 'INR',
    notifications: true,
    autoLogout: 30,
  })

  const [showAddUser, setShowAddUser] = useState(false)
  const [showAddRole, setShowAddRole] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const handleSaveSettings = () => {
    setSaveMessage('Settings saved successfully!')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    ))
  }

  return (
    <div className="settings-rbac">
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
          <Link to="/feature/settings&rbac" className="nav-item active">
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      <div className="main-content">
        <div className="top-navbar">
          <div className="navbar-left">
            <h1>Settings & RBAC</h1>
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

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`tab ${activeTab === 'roles' ? 'active' : ''}`}
            onClick={() => setActiveTab('roles')}
          >
            Roles & Permissions
          </button>
          <button
            className={`tab ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General Settings
          </button>
        </div>

        {activeTab === 'users' && (
          <div className="tab-content">
            <div className="content-header">
              <h2>User Management</h2>
              <button className="add-btn" onClick={() => setShowAddUser(true)}>+ Add User</button>
            </div>
            <div className="stats-bar">
              <span className="stat-item">Total Users: {users.length}</span>
              <span className="stat-item">Active: {users.filter(u => u.status === 'Active').length}</span>
              <span className="stat-item">Inactive: {users.filter(u => u.status === 'Inactive').length}</span>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="user-name">{user.name}</td>
                      <td className="user-email">{user.email}</td>
                      <td>
                        <span className="role-badge">{user.role}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.status === 'Active' ? 'active' : 'inactive'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="last-login">{user.lastLogin}</td>
                      <td>
                        <button className="action-btn edit" onClick={() => handleToggleUserStatus(user.id)}>
                          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button className="action-btn delete" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="tab-content">
            <div className="content-header">
              <h2>Roles & Permissions</h2>
              <button className="add-btn" onClick={() => setShowAddRole(true)}>+ Add Role</button>
            </div>
            <div className="stats-bar">
              <span className="stat-item">Total Roles: {roles.length}</span>
              <span className="stat-item">Permissions Configured</span>
            </div>
            <div className="roles-grid">
              {roles.map(role => (
                <div key={role.id} className="role-card">
                  <div className="role-header">
                    <div>
                      <h3>{role.name}</h3>
                      <p className="role-description">{role.description}</p>
                    </div>
                    <button className="action-btn edit">Edit</button>
                  </div>
                  <div className="role-permissions">
                    <h4>Permissions ({role.permissions.length}):</h4>
                    <ul>
                      {role.permissions.map((perm, idx) => (
                        <li key={idx}>
                          <span className="permission-icon">✓</span>
                          {perm}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'general' && (
          <div className="tab-content">
            <div className="content-header">
              <h2>General Settings</h2>
              <button className="save-btn" onClick={handleSaveSettings}>Save Changes</button>
            </div>
            {saveMessage && (
              <div className="success-message">
                {saveMessage}
              </div>
            )}
            <div className="settings-form">
              <div className="form-group">
                <label>Company Name</label>
                <input 
                  type="text" 
                  value={settings.companyName}
                  onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Timezone</label>
                <select 
                  value={settings.timezone}
                  onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date Format</label>
                <select 
                  value={settings.dateFormat}
                  onChange={(e) => setSettings({...settings, dateFormat: e.target.value})}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div className="form-group">
                <label>Currency</label>
                <select 
                  value={settings.currency}
                  onChange={(e) => setSettings({...settings, currency: e.target.value})}
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    checked={settings.notifications}
                    onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                  />
                  Enable Email Notifications
                </label>
              </div>
              <div className="form-group">
                <label>Auto Logout (minutes)</label>
                <input 
                  type="number" 
                  value={settings.autoLogout}
                  onChange={(e) => setSettings({...settings, autoLogout: parseInt(e.target.value)})}
                  min="5" 
                  max="120" 
                />
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default SettingsRbac
