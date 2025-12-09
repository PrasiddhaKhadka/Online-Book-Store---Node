require('dotenv').config()
const express = require('express')
const app = express()
const notFound = require('./middlewares/not-found')
const errorHandler = require('./middlewares/error-handler')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')


app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

const PORT = process.env.PORT || 8000


// TESTING THE BACKEND
app.get('/',(req,res)=>{
    console.log(req.signedCookies)
    res.status(200).json({msg:'Success',desc:'THE API IS SERVING'})
}) 

// AUTH ROUTER
const authRouter = require('./routes/auth-routes')
app.use('/api/v1/auth',authRouter)

//USER ROUTER
const userRouter = require('./routes/user-routes')
app.use('/api/v1/users',userRouter)

//PRODUCT ROUTER
const productRouter = require('./routes/product-routes')
app.use('/api/v1/products',productRouter)

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