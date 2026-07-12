import React from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Search,
  LayoutDashboard,
  Users,
  Route,
  Wrench,
  Fuel,
  BarChart3,
  Settings,
  Plus,
  Calendar,
  Droplet,
  IndianRupee,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Fleet", icon: Truck },
  { name: "Drivers", icon: Users },
  { name: "Trips", icon: Route },
  { name: "Maintenance", icon: Wrench },
  { name: "Fuel & Expenses", icon: Fuel, active: true },
  { name: "Analytics", icon: BarChart3 },
  { name: "Settings", icon: Settings },
];

const fuelLogs = [
  { vehicle: "VAN-05", date: "05 Jul 2026", liters: "42 L", cost: "3,150" },
  { vehicle: "TRUCK-11", date: "06 Jul 2026", liters: "110 L", cost: "8,400" },
  { vehicle: "MINI-08", date: "06 Jul 2026", liters: "28 L", cost: "2,050" },
];

const expenses = [
  {
    trip: "TR001",
    vehicle: "VAN-05",
    toll: "120",
    other: "0",
    maint: "0",
    status: "Available",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    trip: "TR002",
    vehicle: "TRK-12",
    toll: "340",
    other: "150",
    maint: "18,000",
    status: "Completed",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
];

export default function FuelExpenses() {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">TransitOps</h1>
          </div>
        </motion.div>

        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <a
                  href="#"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    item.active
                      ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 max-w-md"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search trips, vehicles, drivers..."
                className="pl-11 bg-slate-100 border-slate-200 rounded-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 ml-4"
          >
            <span className="text-slate-700 font-medium">Raven K.</span>
            <Avatar>
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
          </motion.div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-8">
            {/* Section 1 - Fuel Logs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="py-4 px-6 border-b border-slate-200 flex flex-row items-center justify-between bg-slate-50/50">
                  <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    Fuel Logs
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                      <Plus className="w-4 h-4 mr-1" />
                      Log Fuel
                    </Button>
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Expense
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Vehicle
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Liters
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Fuel Cost
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {fuelLogs.map((log, index) => (
                        <motion.tr
                          key={log.vehicle + log.date}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                            <div className="flex items-center gap-2">
                              <Truck className="w-4 h-4 text-slate-400" />
                              {log.vehicle}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              {log.date}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <Droplet className="w-4 h-4 text-blue-400" />
                              {log.liters}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                            <div className="flex items-center gap-1">
                              <IndianRupee className="w-4 h-4" />
                              {log.cost}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 2 - Other Expenses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="py-4 px-6 border-b border-slate-200 bg-slate-50/50">
                  <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    Other Expenses (Toll / Misc)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Trip
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Vehicle
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Toll
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Other
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Maint. (Linked)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {expenses.map((exp, index) => (
                        <motion.tr
                          key={exp.trip + exp.vehicle}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                            {exp.trip}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <Truck className="w-4 h-4 text-slate-400" />
                              {exp.vehicle}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <IndianRupee className="w-3 h-3" />
                              {exp.toll}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <IndianRupee className="w-3 h-3" />
                              {exp.other}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <IndianRupee className="w-3 h-3" />
                              {exp.maint}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span
                              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${exp.statusColor}`}
                            >
                              {exp.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </motion.div>

            {/* Bottom Calculation Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-100 rounded-xl p-6 border border-slate-300 flex items-center justify-between"
            >
              <p className="text-slate-700 font-medium flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-slate-500" />
                TOTAL OPERATIONAL COST (AUTO) = FUEL + MAINT
              </p>
              <div className="flex items-center gap-2">
                <IndianRupee className="w-6 h-6 text-amber-600" />
                <span className="text-3xl font-bold text-amber-600">34,070</span>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
