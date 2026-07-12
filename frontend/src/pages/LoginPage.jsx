// src/pages/Login.jsx
import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // preventDefault
    console.log("Form submitted:", formData);
    if(!formData.remember){
    setFormData({email:"",password:"",role:"",remember:false})}
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/3 bg-white/70 backdrop-blur-md p-8 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <img
            src="https://cdn.dribbble.com/userupload/43455699/file/original-acf5494a95456a4b7455ae8d7c15c9f1.jpg?resize=1504x1128&vertical=center"
            alt="Logo"
            className="w-20 h-20 mb-4"
          />
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800">TransitOps</h1>
          <p className="text-gray-600 mt-2">
            Smart transport operation platform
          </p>

          {/* Roles */}
          <div className="mt-6 py-10">
            <p className="font-semibold text-gray-700 mb-2">
              One login, four roles:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Fleet Manager</li>
              <li>Dispatcher</li>
              <li>Safety Officer</li>
              <li>Financial Analyst</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-8">
          © TransitOps
        </footer>
      </div>

      {/* Right Side */}
      <div className="w-2/3 bg-gray-900 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 w-96"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

          {/* Email */}
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

          {/* Password */}
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

          {/* Role Dropdown */}
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

          {/* Remember Me + Forgot Password */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onSubmit={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
