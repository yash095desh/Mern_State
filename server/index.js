import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './Routes/userRoutes.js'
import authRoute from './Routes/authRoute.js'
dotenv.config()

const app = express()
    app.use(express.json())
const port = process.env.PORT

mongoose.connect(process.env.MONGO)
.then(()=>{console.log('server successfully connected!')})
.catch((err)=>{console.log(err)})

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)

app.get('/',(req,res)=>{
    res.status(201).send('Hello')
})



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

app.use((err,req,res,next)=>{
    const statusCode =err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    })
});