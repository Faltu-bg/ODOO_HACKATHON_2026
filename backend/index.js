const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/user')
const Driver = require('./models/Driver')
const Vehicle = require('./models/Vehicle')
const Trip = require('./models/Trip')
const Maintenance = require('./models/Maintenance')

const jwt = require("jsonwebtoken");
const {auth,authlogin}=require('./middleware/auth')
const app = express()
const port = 3000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const mongo_username = "userg3709_db_user"
const mongo_password = "NYC4wzzRf3CE7lp6"
mongoose.connect(
    `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.z97tamy.mongodb.net/?appName=Cluster0`)
    .then(() => { console.log("Connected to MongoDB Atlas") })
    .catch((err) => {
        console.log(`MongoDB connection error: ${err}`)
    })

app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running" })
})


app.post("/api/login",authlogin)


app.get("/api/drivers",auth, async (req, res) => {
    try {
        const drivers = await Driver.find()
        res.json(drivers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


app.get("/api/vehicles",auth, async (req, res) => {
    try {
        const vehicles = await Vehicle.find()
        res.json(vehicles)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


app.get("/api/trips",auth, async (req, res) => {
    try {
        const trips = await Trip.find().populate('vehicle driver')
        res.json(trips)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.get("/api/maintenance",auth, async (req, res) => {
    try {
        const maintenance = await Maintenance.find().populate('vehicle')
        res.json(maintenance)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


app.get("/api/users",auth, async (req, res) => {
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