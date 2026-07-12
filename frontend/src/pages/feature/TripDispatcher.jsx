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
  MapPin,
  User,
  Clock,
  AlertTriangle,
  X,
  Check,
  ArrowRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Fleet", icon: Truck },
  { name: "Drivers", icon: Users },
  { name: "Trips", icon: Route, active: true },
  { name: "Maintenance", icon: Wrench },
  { name: "Fuel & Expenses", icon: Fuel },
  { name: "Analytics", icon: BarChart3 },
  { name: "Settings", icon: Settings },
];

const steps = [
  { id: 1, name: "Draft", status: "completed" },
  { id: 2, name: "Dispatched", status: "active" },
  { id: 3, name: "Completed", status: "pending" },
  { id: 4, name: "Cancelled", status: "pending" },
];

const liveTrips = [
  {
    id: "TR001",
    route: "Gandhinagar Depot → Ahmedabad Hub",
    status: "Dispatched",
    vehicle: "VAN-05 / ALEX",
    time: "45 min",
    statusColor: "bg-blue-500",
  },
  {
    id: "TR004",
    route: "Vatva Industrial Area → Sanand Warehouse",
    status: "Draft",
    vehicle: "TRUCK-04 / SURESH",
    time: "Awaiting driver",
    statusColor: "bg-slate-400",
  },
  {
    id: "TR006",
    route: "Mansa → Kalol Depot",
    status: "Cancelled",
    vehicle: "Unassigned",
    time: "Vehicle went to shop",
    statusColor: "bg-red-500",
  },
];

export default function TripDispatcher() {
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
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-slate-800 mb-6"
          >
            Trip Dispatcher
          </motion.h2>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Form */}
            <div className="col-span-5 space-y-6">
              {/* Progress Stepper */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      Trip Lifecycle
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                step.status === "completed"
                                  ? "bg-green-500 text-white"
                                  : step.status === "active"
                                  ? "bg-blue-500 text-white ring-4 ring-blue-100"
                                  : "bg-slate-200 text-slate-500"
                              }`}
                            >
                              {step.status === "completed" ? (
                                <Check className="w-5 h-5" />
                              ) : (
                                step.id
                              )}
                            </div>
                            <span
                              className={`text-xs mt-2 ${
                                step.status === "pending" ? "text-slate-500" : "text-slate-700"
                              }`}
                            >
                              {step.name}
                            </span>
                          </div>
                          {index < steps.length - 1 && (
                            <div
                              className={`flex-1 h-1 mx-2 rounded ${
                                step.status === "completed" ? "bg-green-500" : "bg-slate-200"
                              }`}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Form Fields */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      New Trip Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Source</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input placeholder="Enter pickup location" className="pl-11" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Destination</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input placeholder="Enter delivery location" className="pl-11" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Vehicle (Available only)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="VAN-05">VAN-05</SelectItem>
                          <SelectItem value="TRUCK-04">TRUCK-04</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Driver (Available only)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select driver" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALEX">ALEX</SelectItem>
                          <SelectItem value="SURESH">SURESH</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Cargo Weight (kg)</Label>
                      <Input type="number" placeholder="Enter cargo weight" />
                    </div>

                    <div className="space-y-2">
                      <Label>Planned Distance (km)</Label>
                      <Input type="number" placeholder="Enter planned distance" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Alert Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-700 font-medium">
                      Vehicle Capacity: 500 kg | Cargo Weight: 700 kg
                    </p>
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-2">
                      <X className="w-4 h-4" />
                      Capacity exceeded by 200 kg – dispatch blocked
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
              >
                <Button disabled className="flex-1 bg-slate-300 text-slate-500">
                  Dispatch
                </Button>
                <Button variant="outline" className="flex-1">
                  Cancel
                </Button>
              </motion.div>
            </div>

            {/* Right Column - Live Board */}
            <div className="col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl border border-slate-200 p-6 h-full"
              >
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Live Board
                </h3>

                <div className="space-y-4">
                  {liveTrips.map((trip, index) => (
                    <motion.div
                      key={trip.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="border border-dashed border-slate-300 rounded-lg p-4 flex items-center justify-between hover:border-slate-400 hover:bg-slate-50 transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-800">{trip.id}</span>
                          <span className={`w-2 h-2 rounded-full ${trip.statusColor}`} />
                        </div>
                        <p className="text-sm text-slate-600 mt-1 flex items-center gap-1">
                          {trip.route}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {trip.vehicle}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 ${trip.statusColor} text-white text-xs font-semibold rounded-full`}
                        >
                          {trip.status}
                        </span>
                        <p className="text-sm font-medium text-slate-700 mt-2 flex items-center gap-1 justify-end">
                          <Clock className="w-4 h-4" />
                          {trip.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
