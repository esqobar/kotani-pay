require('express-async-errors')
require('dotenv').config()
const express = require('express')
const dbConnection = require('./db/connect')
const authenticatingUser = require('./middlewares/authentication')
const notFound = require('./middlewares/not-found')
const errorHandling = require('./middlewares/error-handler')
const morgan = require('morgan')
const cors = require('cors')

//app initialization
const app = express()
app.use(express.json())

// routes
const AuthRoutes = require('./routes/auth')

app.use('/api_v2/api', AuthRoutes)


//middleware
app.use(morgan('dev'))
app.use(cors())
app.use(notFound)
app.use(errorHandling)

const port = process.env.PORT || 8088

const start = async () => {
    try {
        await dbConnection(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is running successfully on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start();