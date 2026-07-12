// src/components/AddDriver.jsx
import { useState, useEffect } from "react";

const AddDriver = ({ open, setOpen, onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    license: "",
    category: "LMV",
    expiry: "",
    contact: "",
    score: "",
    status: "Available",
  });

  useEffect(() => {
    if (!open) {
      // reset when modal closes
      setForm({
        name: "",
        license: "",
        category: "LMV",
        expiry: "",
        contact: "",
        score: "",
        status: "Available",
      });
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (!form.name.trim() || !form.license.trim()) {
      // you can replace with a nicer UI message if desired
      alert("Please provide both driver name and license number.");
      return;
    }

    const newDriver = {
      name: form.name.trim(),
      license: form.license.trim(),
      category: form.category,
      expiry: form.expiry || "N/A",
      contact: form.contact || "N/A",
      score: form.score ? `${form.score}%` : "0%",
      status: form.status || "Available",
    };

    // call parent handler if provided
    if (typeof onAdd === "function") {
      onAdd(newDriver);
    }

    // close modal
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#181818] border border-gray-700 w-[500px] rounded-xl p-6 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add Driver</h2>
          <button onClick={() => setOpen(false)} className="text-gray-400 text-xl" aria-label="Close">
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Driver Name"
            className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-2 outline-none"
            required
          />

          <input
            name="license"
            value={form.license}
            onChange={handleChange}
            type="text"
            placeholder="License Number"
            className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-2"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full bg-[#181818] border border-gray-700 rounded-md px-4 py-2"
          >
            <option value="LMV">LMV</option>
            <option value="HMV">HMV</option>
            <option value="Other">Other</option>
          </select>

          <input
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            type="text"
            placeholder="Expiry (MM/YYYY or N/A)"
            className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-2"
          />

          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            type="text"
            placeholder="Contact Number"
            className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-2"
          />

          <input
            name="score"
            value={form.score}
            onChange={handleChange}
            type="number"
            min="0"
            max="100"
            placeholder="Safety Score (0-100)"
            className="w-full bg-transparent border border-gray-700 rounded-md px-4 py-2"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full bg-[#181818] border border-gray-700 rounded-md px-4 py-2"
          >
            <option value="Available">Available</option>
            <option value="Off Duty">Off Duty</option>
            <option value="Suspended">Suspended</option>
            <option value="On Trip">On Trip</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-5 py-2 rounded-md border border-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-yellow-600 hover:bg-yellow-500"
            >
              Add Driver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDriver;
