const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')
const passport = require('passport')
const passportJWT = require('./middleware/passport')
const userRouter = require('./routes/userRouter')
const tasksRouter = require('./routes/taskRouter')
const countRouter = require('./routes/countRouter')

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cors())
app.use(passport.initialize())
passportJWT(passport)

app.use("/auth", userRouter)
app.use("/tasks", tasksRouter)
app.use('/count', countRouter)

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