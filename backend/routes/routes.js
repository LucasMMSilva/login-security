const express = require('express')
const route = express.Router()
const {register,login,getUserById} = require('../controller/UserController')
const authUser = require('../middlewares/authUser')

route.post('/register',register)
route.post('/register',login)

route.get('/',authUser,getUserById)

module.exports = route