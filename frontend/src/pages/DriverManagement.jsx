// src/pages/DriverManagement.jsx
import React, { useState, useMemo, useEffect } from "react";
import AddDriver from "../components/AddDriver";

const initialDrivers = [
  { name: "Alex", license: "DL-88213", category: "LMV", expiry: "12/2038", contact: "98765xxxxx", score: "96%", status: "Available" },
  { name: "John", license: "DL-44120", category: "HMV", expiry: "03/2025 EXPIRED", contact: "98230xxxxx", score: "81%", status: "Suspended" },
  { name: "Priya", license: "DL-77031", category: "LMV", expiry: "08/2032", contact: "99110xxxxx", score: "99%", status: "On Trip" },
  { name: "Suresh", license: "DL-90045", category: "HMV", expiry: "01/2027", contact: "97440xxxxx", score: "88%", status: "Off Duty" },
];

const statusStyle = {
  Available: "bg-emerald-300 text-emerald-900",
  "On Trip": "bg-sky-300 text-sky-900",
  Suspended: "bg-amber-300 text-amber-900",
  "Off Duty": "bg-gray-300 text-gray-900",
};

export default function DriverManagement() {
  // load from localStorage so added drivers persist across refresh
  const [drivers, setDrivers] = useState(() => {
    try {
      const raw = localStorage.getItem("drivers");
      return raw ? JSON.parse(raw) : initialDrivers;
    } catch {
      return initialDrivers;
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    try {
      localStorage.setItem("drivers", JSON.stringify(drivers));
    } catch {}
  }, [drivers]);

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

  const handleAddDriver = (newDriver) => {
    // prevent duplicate license entries
    setDrivers((prev) => {
      const exists = prev.some((p) => p.license === newDriver.license);
      if (exists) {
        // replace existing driver with same license
        return prev.map((p) => (p.license === newDriver.license ? newDriver : p));
      }
      return [newDriver, ...prev];
    });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Driver Management</h1>
          <p className="text-sm text-gray-300 mt-1">Manage drivers, licenses, and statuses</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setQuery("");
              setStatusFilter("All");
            }}
            className="hidden md:inline-block px-4 py-2 bg-gray-800 border border-gray-700 rounded text-gray-300 hover:bg-gray-700"
          >
            Reset Filters
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-yellow-500 to-yellow-400 px-5 py-2 rounded-lg text-sm font-medium text-black shadow-sm hover:from-yellow-400 hover:to-yellow-300"
          >
            + Add Driver
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search driver, license, contact..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 md:w-72 bg-[#071022] border border-gray-700 rounded-md px-4 py-2 outline-none text-gray-100 placeholder-gray-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#071022] border border-gray-700 rounded-md px-4 py-2 text-gray-100"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s} className="bg-[#071022] text-gray-100">
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto flex gap-3">
          <button
            onClick={() => {
              setQuery("");
              setStatusFilter("All");
            }}
            className="px-4 py-2 bg-transparent border border-gray-700 rounded text-gray-300 hover:bg-gray-800"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-800 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="text-gray-300 bg-[#071022] border-b border-gray-800">
            <tr>
              <th className="text-left p-4" scope="col">DRIVER</th>
              <th scope="col">LICENSE NO</th>
              <th scope="col">CATEGORY</th>
              <th scope="col">EXPIRY</th>
              <th scope="col">CONTACT</th>
              <th scope="col">SAFETY SCORE</th>
              <th scope="col">STATUS</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {filteredDrivers.map((driver) => (
              <tr key={driver.license} className="border-b border-gray-800 hover:bg-[#0f1724]">
                <td className="p-4">
                  <div className="text-gray-100 font-medium">{driver.name}</div>
                  <div className="text-xs text-gray-400">{driver.category}</div>
                </td>

                <td className="text-gray-200">{driver.license}</td>
                <td className="text-gray-200">{driver.category}</td>

                <td className={driver.expiry?.toString().includes("EXPIRED") ? "text-rose-400" : "text-gray-200"}>
                  {driver.expiry}
                </td>

                <td className="text-gray-200">{driver.contact}</td>
                <td className="text-gray-200">{driver.score}</td>

                <td>
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${statusStyle[driver.status] || "bg-gray-300 text-gray-900"}`}
                  >
                    {driver.status}
                  </span>
                </td>

                <td>
                  <button className="text-cyan-400 hover:underline" aria-label={`View ${driver.name}`}>
                    View
                  </button>
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
      <div className="mt-6 text-sm text-amber-400">
        Rule: Expired license or Suspended driver cannot be assigned to trips.
      </div>

      {/* AddDriver modal */}
      <AddDriver open={showModal} setOpen={setShowModal} onAdd={handleAddDriver} />
    </div>
  );
}
