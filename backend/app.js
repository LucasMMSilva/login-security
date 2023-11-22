const express = require('express')
const app = express()
const router = require('./routes/routes')

app.use('/',router)

app.listen(5000,()=>{
    console.log('conectado')
})