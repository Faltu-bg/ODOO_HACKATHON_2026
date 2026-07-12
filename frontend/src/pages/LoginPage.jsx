// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Static users for local testing only
  const staticUsers = [
    {
      email: "fleet@transitops.test",
      password: "fleet123",
      role: "fleet_manager",
      name: "Fleet Manager (Static)",
      token: "static-token-fleet",
    },
    {
      email: "dispatch@transitops.test",
      password: "dispatch123",
      role: "dispatcher",
      name: "Dispatcher (Static)",
      token: "static-token-dispatch",
    },
    {
      email: "safety@transitops.test",
      password: "safety123",
      role: "safety_officer",
      name: "Safety Officer (Static)",
      token: "static-token-safety",
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Find user by email
    const found = staticUsers.find((u) => u.email === formData.email.trim().toLowerCase());

    // No API calls — only static auth
    if (!found) {
      setError("Unknown email. Please check your email address.");
      setLoading(false);
      return;
    }

    // Password check
    if (found.password !== formData.password) {
      setError("Incorrect password. Please try again.");
      setLoading(false);
      return;
    }

    // Role check if provided
    if (formData.role && found.role !== formData.role) {
      setError("Role does not match. Select the correct role for this account.");
      setLoading(false);
      return;
    }

    // Success: persist token and user, notify parent, navigate
    const user = { email: found.email, name: found.name, role: found.role };
    localStorage.setItem("token", found.token);
    localStorage.setItem("user", JSON.stringify(user));

    if (typeof onLogin === "function") onLogin();

    setLoading(false);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/3 bg-white/70 backdrop-blur-md p-8 flex flex-col justify-between">
        <div>
          <img
            src="https://imgs.search.brave.com/DC5c-XL650shtN1rTLZbJzNJAxiAPVIwoXMQljMd1vk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ2/NzM4ODIzNi92ZWN0/b3IvcmliYm9uLWZv/bnQtYWxwaGFiZXQt/ZW5nbGlzaC11cHBl/cmNhc2UtM2QtbGV0/dGVyLXQuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPWRIZ3c1/enFJY0tnTWxqaXRB/VDRQWUVQSmZ5ZHlJ/VnFpck1kTzd2YTRP/WWM9"
            alt="Logo"
            className="w-20 h-20 mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800">TransitOps</h1>
          <p className="text-gray-600 mt-2">Smart transport operation platform</p>

          <div className="mt-6">
            <p className="font-semibold text-gray-700 mb-2">One login, four roles:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Fleet Manager</li>
              <li>Dispatcher</li>
              <li>Safety Officer</li>
              <li>Financial Analyst</li>
            </ul>
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm mt-8">© TransitOps</footer>
      </div>

      {/* Right Side */}
      <div className="w-2/3 bg-gray-900 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-96">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

          {error && <div className="mb-4 text-sm text-rose-500">{error}</div>}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a role</option>
              <option value="fleet_manager">Fleet Manager</option>
              <option value="dispatcher">Dispatcher</option>
              <option value="safety_officer">Safety Officer</option>
              <option value="financial_analyst">Financial Analyst</option>
            </select>
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="mr-2"
              />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
