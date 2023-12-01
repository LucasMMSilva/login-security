const express = require('express')
const route = express.Router()
const {register,login,getUserById} = require('../controller/UserController')
const {removeLogToken} = require('../controller/LogAuthenticationController')
const authUser = require('../middlewares/authUser')

route.post('/register',register)
route.post('/login',login)
route.delete('/exit',authUser,removeLogToken)
route.get('/',authUser,getUserById)

module.exports = route