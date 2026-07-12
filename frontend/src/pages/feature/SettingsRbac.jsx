import { useState } from 'react'
import { Link } from 'react-router-dom'
import './SettingsRbac.css'

function SettingsRbac() {
  const [activeTab, setActiveTab] = useState('users')
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Driver', status: 'Active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Dispatcher', status: 'Inactive' },
  ])

  const [roles] = useState([
    { id: 1, name: 'Admin', permissions: ['Full Access', 'User Management', 'System Settings'] },
    { id: 2, name: 'Manager', permissions: ['Fleet Management', 'Driver Management', 'Trip Management'] },
    { id: 3, name: 'Dispatcher', permissions: ['Trip Assignment', 'View Vehicles', 'View Drivers'] },
    { id: 4, name: 'Driver', permissions: ['View Assigned Trips', 'Update Trip Status'] },
  ])

  const [settings] = useState({
    companyName: 'Fleet Management Co.',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    currency: 'INR',
    notifications: true,
    autoLogout: 30,
  })

  return (
    <div className="settings-rbac">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Fleet Management</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/feature/dashboard" className="nav-item">Dashboard</Link>
          <Link to="/feature/vehicleregistry" className="nav-item">Fleet</Link>
          <Link to="/feature/drivers" className="nav-item">Drivers</Link>
          <Link to="/feature/trips" className="nav-item">Trips</Link>
          <Link to="/feature/maintenance" className="nav-item">Maintenance</Link>
          <Link to="/feature/fuel" className="nav-item">Fuel & Expenses</Link>
          <Link to="/feature/analytics" className="nav-item">Analytics</Link>
          <Link to="/feature/settings&rbac" className="nav-item active">Settings</Link>
        </nav>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Settings & RBAC</h1>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
        </div>

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
              <button className="add-btn">+ Add User</button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="role-badge">{user.role}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.status === 'Active' ? 'active' : 'inactive'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn edit">Edit</button>
                        <button className="action-btn delete">Delete</button>
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
              <button className="add-btn">+ Add Role</button>
            </div>
            <div className="roles-grid">
              {roles.map(role => (
                <div key={role.id} className="role-card">
                  <div className="role-header">
                    <h3>{role.name}</h3>
                    <button className="action-btn edit">Edit</button>
                  </div>
                  <div className="role-permissions">
                    <h4>Permissions:</h4>
                    <ul>
                      {role.permissions.map((perm, idx) => (
                        <li key={idx}>{perm}</li>
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
              <button className="save-btn">Save Changes</button>
            </div>
            <div className="settings-form">
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" defaultValue={settings.companyName} />
              </div>
              <div className="form-group">
                <label>Timezone</label>
                <select defaultValue={settings.timezone}>
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date Format</label>
                <select defaultValue={settings.dateFormat}>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div className="form-group">
                <label>Currency</label>
                <select defaultValue={settings.currency}>
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input type="checkbox" defaultChecked={settings.notifications} />
                  Enable Email Notifications
                </label>
              </div>
              <div className="form-group">
                <label>Auto Logout (minutes)</label>
                <input type="number" defaultValue={settings.autoLogout} min="5" max="120" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SettingsRbac
