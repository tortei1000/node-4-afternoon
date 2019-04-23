const express = require('express')
require('dotenv').config()
const session = require('express-session')

const { SERVER_PORT, SESSION_SECRET } = process.env



const app = express()
const checkForSession = require("./middlewares/checkForSession")


app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(checkForSession)


app.listen(SERVER_PORT, () => {
  console.log(`I m listing at ${SERVER_PORT}`)
})

