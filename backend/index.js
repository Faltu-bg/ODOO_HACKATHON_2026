const express = require('express')
app=express()
port=3000

app.listen(port,()=>{
    console.log(`App has started at ${port}`)
})