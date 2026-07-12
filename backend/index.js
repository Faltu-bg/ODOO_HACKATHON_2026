const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/user')
const Driver = require('./models/Driver')
const Vehicle = require('./models/Vehicle')
const Trip = require('./models/Trip')
const Maintenance = require('./models/Maintenance')

const app = express()
const port = 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
const mongo_username = "userg3709_db_user"
const mongo_password = "NYC4wzzRf3CE7lp6"
mongoose.connect(
    `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.z97tamy.mongodb.net/?appName=Cluster0`)
    .then(() => { console.log("Connected to MongoDB Atlas") })
    .catch((err) => {
        console.log(`MongoDB connection error: ${err}`)
    })

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running" })
})

// Login endpoint
app.post("/api/login", async (req, res) => {
    try {
        const { email, password, role } = req.body
        const user = await User.findOne({ email }).select('+password')
        
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        if (role && user.role !== role) {
            return res.status(403).json({
                message: "Access denied for this role"
            });
        }

        return res.json({
            user: user.toPublic()
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})

// Get all drivers
app.get("/api/drivers", async (req, res) => {
    try {
        const drivers = await Driver.find()
        res.json(drivers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get all vehicles
app.get("/api/vehicles", async (req, res) => {
    try {
        const vehicles = await Vehicle.find()
        res.json(vehicles)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get all trips
app.get("/api/trips", async (req, res) => {
    try {
        const trips = await Trip.find().populate('vehicle driver')
        res.json(trips)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get all maintenance records
app.get("/api/maintenance", async (req, res) => {
    try {
        const maintenance = await Maintenance.find().populate('vehicle')
        res.json(maintenance)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get all users
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})