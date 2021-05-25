const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cors())

mongoose.connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
} ,(error) => {
    if (error){
        console.log("DB Error")
        throw new Error("DB Error")
    }
    console.log("database is connected")
    app.listen(PORT, (error) => {
        if (error){
            throw new Error("Server has not started")
        }
        console.log(`Server has started on ${PORT}`)
    } )
})