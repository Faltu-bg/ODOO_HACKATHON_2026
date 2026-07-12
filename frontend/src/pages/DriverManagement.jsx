// src/pages/DriverManagement.jsx
import React, { useState, useMemo } from "react";
import AddDriver from "../components/AddDriver";

const initialDrivers = [
  { name: "Alex", license: "DL-88213", category: "LMV", expiry: "12/2038", contact: "98765xxxxx", score: "96%", status: "Available" },
  { name: "John", license: "DL-44120", category: "HMV", expiry: "03/2025 EXPIRED", contact: "98230xxxxx", score: "81%", status: "Suspended" },
  { name: "Priya", license: "DL-77031", category: "LMV", expiry: "08/2032", contact: "99110xxxxx", score: "99%", status: "On Trip" },
  { name: "Suresh", license: "DL-90045", category: "HMV", expiry: "01/2027", contact: "97440xxxxx", score: "88%", status: "Off Duty" },
];

const statusStyle = {
  Available: "bg-green-500",
  "On Trip": "bg-blue-500",
  Suspended: "bg-orange-500",
  "Off Duty": "bg-gray-500",
};

export default function DriverManagement() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const statusOptions = useMemo(() => ["All", "Available", "On Trip", "Suspended", "Off Duty"], []);

  const filteredDrivers = useMemo(() => {
    return drivers.filter((d) => {
      if (statusFilter !== "All" && d.status !== statusFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        d.name.toLowerCase().includes(q) ||
        d.license.toLowerCase().includes(q) ||
        (d.contact || "").toLowerCase().includes(q)
      );
    });
  }, [drivers, query, statusFilter]);

  // Add driver handler (receives a driver object from AddDriver modal)
  const handleAddDriver = (newDriver) => {
    // Basic normalization/fallbacks
    const driver = {
      name: newDriver.name || "Unnamed",
      license: newDriver.license || "N/A",
      category: newDriver.category || "N/A",
      expiry: newDriver.expiry || "N/A",
      contact: newDriver.contact || "N/A",
      score: newDriver.score || "0%",
      status: newDriver.status || "Available",
    };
    setDrivers((prev) => [driver, ...prev]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold">Driver Management</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-600 px-5 py-2 rounded-lg text-sm hover:bg-yellow-500"
        >
          + Add Driver
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-5 mb-6 items-start md:items-center">
        <input
          type="text"
          placeholder="Search driver..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent border border-gray-700 rounded-md px-4 py-2 w-72 outline-none text-gray-100 placeholder-gray-400"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#0b0b0b] border border-gray-700 rounded-md px-4 py-2 text-gray-100"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s} className="bg-gray-800 text-gray-100">
              {s}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setQuery("");
            setStatusFilter("All");
          }}
          className="ml-auto md:ml-0 px-4 py-2 bg-gray-900 border border-gray-700 rounded text-gray-200 hover:bg-gray-700"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="border border-gray-900 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-gray-800">
            <tr>
              <th className="text-left p-4">DRIVER</th>
              <th className="text-left">LICENSE NO</th>
              <th>CATEGORY</th>
              <th>EXPIRY</th>
              <th>CONTACT</th>
              <th>SAFETY SCORE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {filteredDrivers.map((driver, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-[#151515]">
                <td className="p-4 text-gray-100">{driver.name}</td>
                <td className="text-gray-200">{driver.license}</td>
                <td className="text-gray-200">{driver.category}</td>
                <td className={driver.expiry?.toString().includes("EXPIRED") ? "text-rose-400" : "text-gray-200"}>
                  {driver.expiry}
                </td>
                <td className="text-gray-200">{driver.contact}</td>
                <td className="text-gray-200">{driver.score}</td>
                <td>
                  <span
                    className={`inline-block px-4 py-1 rounded-md text-black text-xs font-medium ${statusStyle[driver.status] || "bg-gray-300"}`}
                  >
                    {driver.status}
                  </span>
                </td>
                <td>
                  <button className="text-cyan-400 hover:underline">View</button>
                </td>
              </tr>
            ))}

            {filteredDrivers.length === 0 && (
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-400">
                  No drivers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Rules */}
      <div className="mt-8 text-sm text-amber-400">
        Rule: Expired license or Suspended driver cannot be assigned to trips.
      </div>

      {/* AddDriver modal - pass handler to add new driver */}
      <AddDriver open={showModal} setOpen={setShowModal} onAdd={handleAddDriver} />
    </div>
  );
}
