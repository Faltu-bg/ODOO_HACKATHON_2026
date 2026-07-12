// src/pages/Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 5;

/**
 * Props:
 *  - apiEnabled: boolean (default false) -> set true to fetch from API
 *  - baseUrl: string (default "") -> base URL for API endpoints, e.g. "https://api.example.com"
 *
 * Expected API endpoints (GET):
 *  - `${baseUrl}/kpis` -> [{ title, value, color, trend, trendUp }]
 *  - `${baseUrl}/vehicle-status` -> [{ label, value, percentage, color }]
 *  - `${baseUrl}/trips` -> [{ id, vehicle, driver, status, eta, type, region }]
 *
 * The component falls back to static data if fetch fails or apiEnabled is false.
 */
export default function Dashboard({ apiEnabled = false, baseUrl = "" }) {
  // UI state
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("All");
  const [vehicleStatusFilter, setVehicleStatusFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // data state
  const [kpiData, setKpiData] = useState(null);
  const [vehicleStatus, setVehicleStatus] = useState(null);
  const [recentTrips, setRecentTrips] = useState(null);

  // loading / error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---------- Static fallback data (remove later when wiring API) ----------
  const staticKpis = [
    { title: "Active Vehicles", value: 53, color: "#2563EB", trend: "+12%", trendUp: true },
    { title: "Available Vehicles", value: 42, color: "#22C55E", trend: "+8%", trendUp: true },
    { title: "Vehicles in Maintenance", value: 5, color: "#F59E0B", trend: "-3%", trendUp: false },
    { title: "Active Trips", value: 18, color: "#2563EB", trend: "+15%", trendUp: true },
    { title: "Pending Trips", value: 9, color: "#8B5CF6", trend: "+5%", trendUp: true },
    { title: "Drivers on Duty", value: 26, color: "#06B6D4", trend: "+10%", trendUp: true },
    { title: "Fleet Utilization", value: "81%", color: "#22C55E", trend: "+2%", trendUp: true },
  ];

  const staticVehicleStatus = [
    { label: "Available", value: 42, percentage: 42, color: "#22C55E" },
    { label: "On Trip", value: 18, percentage: 18, color: "#2563EB" },
    { label: "In Shop", value: 5, percentage: 5, color: "#F59E0B" },
    { label: "Retired", value: 3, percentage: 3, color: "#EF4444" },
  ];

  const staticTrips = [
    { id: "TR001", vehicle: "VAN-05", driver: "Alex", status: "On Trip", eta: "45 min", type: "Van", region: "North" },
    { id: "TR002", vehicle: "TRK-12", driver: "John", status: "Completed", eta: "—", type: "Truck", region: "South" },
    { id: "TR003", vehicle: "MINI-08", driver: "Priya", status: "Dispatched", eta: "In 10m", type: "Mini", region: "East" },
    { id: "TR004", vehicle: "—", driver: "—", status: "Draft", eta: "Awaiting vehicle", type: "Van", region: "West" },
    { id: "TR005", vehicle: "VAN-07", driver: "Sam", status: "On Trip", eta: "30 min", type: "Van", region: "North" },
    { id: "TR006", vehicle: "TRK-09", driver: "Maya", status: "Completed", eta: "—", type: "Truck", region: "South" },
    { id: "TR007", vehicle: "MINI-11", driver: "Ravi", status: "Draft", eta: "Pending", type: "Mini", region: "East" },
    { id: "TR008", vehicle: "VAN-12", driver: "Nina", status: "Cancelled", eta: "Cancelled", type: "Van", region: "West" },
  ];
  // -----------------------------------------------------------------------

  // helper: map status to color (used for pill background)
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "#22C55E";
      case "On Trip":
        return "#2563EB";
      case "Dispatched":
        return "#0EA5E9";
      case "Completed":
        return "#22C55E";
      case "Draft":
        return "#64748B";
      case "Cancelled":
        return "#EF4444";
      default:
        return "#64748B";
    }
  };

  // fetch data from API if enabled; otherwise use static data
  useEffect(() => {
    let abort = false;
    const controller = new AbortController();

    async function loadData() {
      setLoading(true);
      setError(null);

      if (!apiEnabled) {
        // use static data
        setKpiData(staticKpis);
        setVehicleStatus(staticVehicleStatus);
        setRecentTrips(staticTrips);
        setLoading(false);
        return;
      }

      try {
        // Example endpoints - change to your real endpoints
        const kpiUrl = `${baseUrl}/kpis`;
        const statusUrl = `${baseUrl}/vehicle-status`;
        const tripsUrl = `${baseUrl}/trips`;

        const [kpiRes, statusRes, tripsRes] = await Promise.all([
          fetch(kpiUrl, { signal: controller.signal }),
          fetch(statusUrl, { signal: controller.signal }),
          fetch(tripsUrl, { signal: controller.signal }),
        ]);

        if (!kpiRes.ok || !statusRes.ok || !tripsRes.ok) {
          throw new Error("Failed to fetch one or more endpoints");
        }

        const [kpiJson, statusJson, tripsJson] = await Promise.all([
          kpiRes.json(),
          statusRes.json(),
          tripsRes.json(),
        ]);

        if (abort) return;
        setKpiData(kpiJson);
        setVehicleStatus(statusJson);
        setRecentTrips(tripsJson);
      } catch (err) {
        if (!abort) {
          console.error("Dashboard fetch error:", err);
          setError("Failed to load data from API. Showing static data.");
          // fallback to static data
          setKpiData(staticKpis);
          setVehicleStatus(staticVehicleStatus);
          setRecentTrips(staticTrips);
        }
      } finally {
        if (!abort) setLoading(false);
      }
    }

    loadData();

    return () => {
      abort = true;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiEnabled, baseUrl]);

  // Sorting handler
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Filters and search
  const vehicleTypes = useMemo(() => ["All", "Van", "Truck", "Mini"], []);
  const regions = useMemo(() => ["All", "North", "South", "East", "West"], []);
  const statuses = useMemo(() => ["All", "On Trip", "Completed", "Dispatched", "Available", "Draft", "Cancelled"], []);

  // apply filters, search, sort
  const filteredTrips = useMemo(() => {
    const list = (recentTrips || []).filter((trip) => {
      if (vehicleTypeFilter !== "All" && trip.type !== vehicleTypeFilter) return false;
      if (vehicleStatusFilter !== "All" && trip.status !== vehicleStatusFilter) return false;
      if (regionFilter !== "All" && trip.region !== regionFilter) return false;
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return (
        (trip.id || "").toLowerCase().includes(q) ||
        (trip.vehicle || "").toLowerCase().includes(q) ||
        (trip.driver || "").toLowerCase().includes(q)
      );
    });

    if (!sortConfig.key) return list;

    const dir = sortConfig.direction === "asc" ? 1 : -1;
    return [...list].sort((a, b) => {
      const aVal = (a[sortConfig.key] ?? "").toString().toLowerCase();
      const bVal = (b[sortConfig.key] ?? "").toString().toLowerCase();
      if (aVal < bVal) return -1 * dir;
      if (aVal > bVal) return 1 * dir;
      return 0;
    });
  }, [recentTrips, vehicleTypeFilter, vehicleStatusFilter, regionFilter, searchTerm, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(filteredTrips.length / PAGE_SIZE));
  const paginatedTrips = filteredTrips.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const gotoPage = (page) => {
    const p = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(p);
  };

  // reset page when filters/search change
  useEffect(() => setCurrentPage(1), [vehicleTypeFilter, vehicleStatusFilter, regionFilter, searchTerm, sortConfig]);

  return (
  <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
    {/* Loading / Error */}
    {loading && (
      <div className="mb-4 text-sm text-gray-300">Loading dashboard data...</div>
    )}
    {error && (
      <div className="mb-4 text-sm text-yellow-300 bg-yellow-900/30 p-2 rounded">{error}</div>
    )}

    {/* Filters Row */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div className="flex gap-3 items-center">
        <select
          value={vehicleTypeFilter}
          onChange={(e) => setVehicleTypeFilter(e.target.value)}
          className="px-3 py-2 rounded border border-gray-700 bg-gray-800 text-gray-100"
        >
          {vehicleTypes.map((t) => (
            <option key={t} value={t} className="bg-gray-800 text-gray-100">{t}</option>
          ))}
        </select>

        <select
          value={vehicleStatusFilter}
          onChange={(e) => setVehicleStatusFilter(e.target.value)}
          className="px-3 py-2 rounded border border-gray-700 bg-gray-800 text-gray-100"
        >
          {statuses.map((s) => (
            <option key={s} value={s} className="bg-gray-800 text-gray-100">{s}</option>
          ))}
        </select>

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="px-3 py-2 rounded border border-gray-700 bg-gray-800 text-gray-100"
        >
          {regions.map((r) => (
            <option key={r} value={r} className="bg-gray-800 text-gray-100">{r}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 items-center">
        <input
          type="text"
          placeholder="Search trips, vehicle, driver..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 rounded border border-gray-700 w-64 bg-gray-800 text-gray-100 placeholder-gray-400"
        />
        <button
          onClick={() => {
            setVehicleTypeFilter("All");
            setVehicleStatusFilter("All");
            setRegionFilter("All");
            setSearchTerm("");
            setCurrentPage(1);
          }}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-100 hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
    </div>

    {/* KPI Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {(kpiData || staticKpis).map((kpi) => (
        <div
          key={kpi.title}
          className="bg-gray-800/60 border border-gray-700 rounded-lg shadow-sm p-4 flex items-center justify-between"
        >
          <div>
            <div className="text-sm text-gray-400">{kpi.title}</div>
            <div className="text-2xl font-semibold" style={{ color: kpi.color }}>{kpi.value}</div>
          </div>
          <div className="text-sm">
            <div className={`text-xs ${kpi.trendUp ? "text-emerald-400" : "text-rose-400"}`}>{kpi.trend}</div>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Trips Table */}
      <div className="lg:col-span-2 bg-gray-800/60 rounded-lg border border-gray-700 shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-100">Recent Trips</h3>
          <div className="text-sm text-gray-400">{filteredTrips.length} results</div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-300 border-b border-gray-700">
              <th className="py-2 cursor-pointer" onClick={() => handleSort("id")}>
                Trip {sortConfig.key === "id" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th className="py-2 cursor-pointer" onClick={() => handleSort("vehicle")}>
                Vehicle {sortConfig.key === "vehicle" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th className="py-2 cursor-pointer" onClick={() => handleSort("driver")}>
                Driver {sortConfig.key === "driver" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th className="py-2">Status</th>
              <th className="py-2">ETA</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTrips.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">No trips found</td>
              </tr>
            ) : (
              paginatedTrips.map((row) => (
                <tr key={row.id} className="border-b border-gray-700 hover:bg-gray-800/40">
                  <td className="py-3 text-sm font-medium text-gray-100">{row.id}</td>
                  <td className="py-3 text-sm text-gray-200">{row.vehicle}</td>
                  <td className="py-3 text-sm text-gray-200">{row.driver}</td>
                  <td className="py-3 text-sm">
                    <span
                      className="inline-block px-2 py-1 rounded text-xs font-medium"
                      style={{ backgroundColor: `${getStatusColor(row.status)}22`, color: getStatusColor(row.status) }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-200">{row.eta}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => gotoPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border bg-gray-800 text-gray-100 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => gotoPage(page)}
                  className={`px-3 py-1 rounded ${page === currentPage ? "bg-indigo-500 text-white" : "bg-gray-800 border border-gray-700 text-gray-100"}`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => gotoPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border bg-gray-800 text-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Vehicle Status */}
      <div className="bg-gray-800/60 rounded-lg border border-gray-700 shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Vehicle Status</h3>
        {(vehicleStatus || staticVehicleStatus).map((s) => (
          <div key={s.label} className="mb-4">
            <div className="flex justify-between mb-1">
              <div className="text-sm text-gray-300">{s.label}</div>
              <div className="text-sm font-medium text-gray-100">{s.value} ({s.percentage}%)</div>
            </div>
            <div className="w-full bg-gray-700 rounded h-3">
              <div
                className="h-3 rounded"
                style={{ width: `${s.percentage}%`, backgroundColor: s.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
