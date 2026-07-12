// src/pages/Maintenance.jsx
import React, { useState, useEffect } from "react";

export default function Maintenance() {
  const initial = [
    { id: Date.now() - 300000, vehicle: "VAN-05", service: "Oil Change", cost: 2500, date: "2026-06-12", status: "In Shop" },
    { id: Date.now() - 200000, vehicle: "TRUCK-11", service: "Engine Repair", cost: 18000, date: "2026-05-02", status: "Completed" },
    { id: Date.now() - 100000, vehicle: "MINI-03", service: "Tyre Replace", cost: 6200, date: "2026-06-20", status: "In Shop" },
  ];

  const [records, setRecords] = useState(() => {
    try {
      const raw = localStorage.getItem("maintenance_records");
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  const [form, setForm] = useState({
    vehicle: "",
    service: "",
    cost: "",
    date: "",
    status: "In Shop",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const statusColor = {
    "In Shop": "bg-yellow-500 text-black",
    Completed: "bg-emerald-500 text-black",
    Active: "bg-sky-500 text-black",
    Cancelled: "bg-rose-500 text-black",
  };

  useEffect(() => {
    try {
      localStorage.setItem("maintenance_records", JSON.stringify(records));
    } catch {}
  }, [records]);

  const resetForm = () =>
    setForm({ vehicle: "", service: "", cost: "", date: "", status: "In Shop" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // basic validation
    if (!form.vehicle.trim() || !form.service.trim() || !form.cost || !form.date) {
      setError("Please fill vehicle, service, cost and date.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      vehicle: form.vehicle.trim(),
      service: form.service.trim(),
      cost: Number(form.cost),
      date: form.date,
      status: form.status,
    };

    try {
      setSaving(true);

      // optimistic UI update
      setRecords((prev) => [newRecord, ...prev]);
      resetForm();
      setSuccess("Record saved.");
      // clear success after short delay
      setTimeout(() => setSuccess(""), 2500);
    } catch (err) {
      console.error(err);
      setError("Failed to save record. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this maintenance record?")) return;
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form */}
        <div>
          <h2 className="text-sm text-gray-300 mb-5">LOG SERVICE RECORD</h2>

          <form onSubmit={handleSave} className="space-y-4 bg-[#071022] p-6 rounded-lg border border-gray-800">
            {error && <div className="text-sm text-rose-400">{error}</div>}
            {success && <div className="text-sm text-emerald-400">{success}</div>}

            <input
              name="vehicle"
              value={form.vehicle}
              onChange={handleChange}
              placeholder="Vehicle (e.g. VAN-05)"
              className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-2 text-gray-100"
            />

            <input
              name="service"
              value={form.service}
              onChange={handleChange}
              placeholder="Service Type (e.g. Oil Change)"
              className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-2 text-gray-100"
            />

            <input
              name="cost"
              value={form.cost}
              onChange={handleChange}
              placeholder="Cost (₹)"
              type="number"
              min="0"
              className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-2 text-gray-100"
            />

              <input
              name="date"
              value={form.date}
              onChange={handleChange}
              type="date"
              className="w-full bg-transparent border border-gray-200 rounded-md px-4 py-2 text-gray-100"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-[#071022] border hover:bg-white border-gray-700 rounded-md px-4 py-2 text-gray-100"
            >
              <option value="In Shop">In Shop</option>
              <option value="Completed">Completed</option>
              <option value="Active">Active</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:from-yellow-400 hover:to-yellow-300"
              >
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-transparent border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800"
              >
                Clear
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-400">
              <p className="text-green-400 inline">Available</p>
              <span className="text-gray-500 mx-4">─────────→</span>
              <span className="text-yellow-400">In Shop</span>
              <p className="mt-3 text-orange-400">Note: In Shop vehicles are removed from dispatch pool.</p>
            </div>
          </form>
        </div>

        {/* Service Log */}
        <div>
          <h2 className="text-sm mb-5 text-gray-300">SERVICE LOG</h2>

          <div className="bg-[#071022] rounded-lg border border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="text-gray-300 bg-[#071022] border-b border-gray-800">
                <tr>
                  <th className="text-left py-3 px-4">VEHICLE</th>
                  <th className="py-3">SERVICE</th>
                  <th className="py-3">COST</th>
                  <th className="py-3">DATE</th>
                  <th className="py-3">STATUS</th>
                  <th className="py-3">ACTION</th>
                </tr>
              </thead>

              <tbody>
                {records.map((item) => (
                  <tr key={item.id} className="border-b border-gray-800 hover:bg-[#0f1724]">
                    <td className="py-3 px-4 text-gray-100 font-medium">{item.vehicle}</td>
                    <td className="py-3 text-gray-200">{item.service}</td>
                    <td className="py-3 text-gray-200">₹{Number(item.cost).toLocaleString()}</td>
                    <td className="py-3 text-gray-200">{item.date}</td>
                    <td className="py-3">
                      <span
                        className={`inline-block px-4 py-1 rounded-md text-xs font-semibold ${statusColor[item.status] || "bg-gray-300 text-gray-900"}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-rose-400 hover:underline text-sm"
                        aria-label={`Delete record for ${item.vehicle} on ${item.date}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {records.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-400">No records</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
