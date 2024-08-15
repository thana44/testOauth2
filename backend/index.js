const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path')
require('dotenv').config()

const authRoute = require('./route/auth.route')
const oauthRoute = require('./route/oauth.route')
const route = require('./route/route')

//set up passport oauth
const session = require('express-session')
const passport = require('passport')
require('./passport')
//----------------------------

const {readdirSync} = require('fs')
const { strict } = require('assert')

const connectDB = async()=>{
    try{
        //code
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB connected server7.')
    }catch(e){
        console.log(e)
    }
}
connectDB()

const PORT = 7744

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173',process.env.frontend_domain]
}))
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '10mb'}))

//set up passport oauth
app.use(session({
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
        secure: process.env.node_env === 'production',
        httpOnly: true,
        sameSite:'strict'
    }
}))

app.use(passport.initialize())
app.use(passport.session())
//---------------------------

app.use('/', authRoute)
app.use('/', oauthRoute)
app.use('/', route)


app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})

app.use(express.static(path.join(__dirname, '../fontend/dist')));
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../fontend/dist', 'index.html'))
});