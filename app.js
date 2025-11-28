require('dotenv').config()
const express = require('express')
const app = express()
const notFound = require('./middlewares/not-found')
const errorHandler = require('./middlewares/error-handler')
const morgan = require('morgan')


app.use(morgan('tiny'))
app.use(express.json())

const PORT = process.env.PORT || 8000


// TESTING THE BACKEND
app.get('/',(req,res)=>{
    res.status(200).json({msg:'Success',desc:'THE API IS SERVING'})
}) 

// AUTH ROUTER
const authRouter = require('./routes/auth-routes')
app.use('/api/v1/auth',authRouter)

app.use(notFound)
app.use(errorHandler)

// DATABASE CONNECTION
const connectDb = require("./db/conn-db")

const startApp = async()=>{
    try {
        await connectDb(process.env.MONGODB_URL)
        app.listen(PORT,()=>{
            console.log('Server listening at 8000')
        })
    } catch (error) {
        console.log(error)
    }
}

startApp();