require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const cors = require('cors')
const logger = require('./middleware/logger')

const PORT = process.env.PORT || 5000

connectDB()

app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname,'views','404.html'))
    } else if (req.accepts('json')) {
        res.send({message:"404 not found"})
    } else {
        res.type('text').send('404 not found')
    }
})
const corsOptions ={
    origin:'http://localhost:3000',
    optionSuccessStatus: 200 , 
    methods:"GET , PUT"
}
app.use(cors(corsOptions));

app.get ('/' , (req , res ,next )=>{
    logger.log("debug" , "Hello ,Winston")
    logger.log("This is the home'/' route.");
    res.status(200).send("Logging hello world")
});
app.get ("/event", (res,req,next)=>{
    try{
        throw new Error("Not User !")
    }catch (error){
        logger.error("Events Error:Unauthenticated user")
        res.status(500).send("Error!")
    }
})


mongoose.connection.once('open', () => {
  logger.info('Connected to MongoDB')
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`))
})