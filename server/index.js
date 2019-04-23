const express = require('express')
require('dotenv').config()
const session = require('express-session')

const { SERVER_PORT, SESSION_SECRET } = process.env

const swagController = require('./controller/swagController')
const authController = require('./controller/authController')
const cartController = require('./controller/cartController')
const searchController = require('./controller/searchController')
const app = express()
const checkForSession = require("./middlewares/checkForSession")

app.use(express.static(`${__dirname}/../build`))
app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(checkForSession)

app.get('/api/swag', swagController.read)
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)
app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)
app.get('/api/search/', searchController.search)


app.listen(SERVER_PORT, () => {
  console.log(`I m listing at ${SERVER_PORT}`)
})

