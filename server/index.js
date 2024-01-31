import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config

const app = express()
const port = process.env.PORT

mongoose.connect(process.env.MONGO)
.then(()=>{console.log('server successfully connected!')})
.catch((err)=>{console.log(err)})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})