const express = require('express')
const route = express.Router()
const {register,login} = require('../controller/UserController')

route.post('/register',register)
route.post('/register',login)

module.exports = route