const express = require('express');
const app = express();  
const port = 8000
const cors = require("cors")

app.use(cors())
app.use(express.json())

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/FactoryDB').then(() => console.log("Connected to DB")) 

const updateTime = require('./updateTime')
updateTime.scheduleDailyUpdate(11, 17).then(() => console.log("Scheduled work on 8:00 AM"))

const authController = require('./Controllers/authController')
app.use('/login', authController)

const employeeController = require('./Controllers/employeeController')
app.use('/employee', employeeController)

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})