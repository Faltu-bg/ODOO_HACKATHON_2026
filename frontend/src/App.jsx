// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DriverManagement from "./pages/DriverManagement";
import Dashboard from "./pages/Dashboard";
import Maintenance from "./pages/Maintainance";
import Login from "./pages/LoginPage";

/**
 * Layout that shows Navbar + Sidebar and renders child routes via Outlet.
 * This layout will be used for all protected pages (not Login).
 */
const LayoutWithNavbar = () => (
  <div className="min-h-screen bg-[#0b1220]">
    <Navbar />
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  </div>
);

/**
 * Simple protected route wrapper. If not authenticated, redirect to /login.
 */
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  // Temporarily start authenticated so you can verify protected pages render.
  // Revert to your real auth initializer when done testing.
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <Routes>
      {/* Public login route (no Navbar/Sidebar) */}
      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      {/* Root: redirect based on auth */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        }
      />

      {/* Protected routes inside layout that includes Navbar + Sidebar */}
      <Route
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <LayoutWithNavbar />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
        <Route path="/drivers" element={<DriverManagement />} />
        <Route path="/maintainance" element={<Maintenance />} />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}
