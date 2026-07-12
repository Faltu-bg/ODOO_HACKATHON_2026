const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user')
app = express()
const port = 3000
const mongo_username="userg3709_db_user"
const mongo_password="NYC4wzzRf3CE7lp6"
mongoose.connect( 
    `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.z97tamy.mongodb.net/?appName=Cluster0`)
    .then(() => { console.log("Connected to atlas") })
    .catch((err) => {
        console.log(`${err} has occured`)
    })

app.post("/api/login", async (req, res) => {
    try {
        const { email, password, role } = req.body
        const user = await User.findOne({ email, password, role })
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        return res.json({
            "user": user.name
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})
app.get("/api/records",(req,res)=>{
    console.log("records will be available soon")
})
app.get("/api/drivers",(req,res)=>{
    console.log("drivers will be available soon")

})
app.get("/api/trips",(req,res)=>{
    console.log("trips will be available soon")

})
app.get("/api/vehicles",(req,res)=>{
    console.log("vehicles will be available soon")

})

app.listen(port, () => {
    console.log(`App has started at ${port}`)
})