const mongoose = require('../config/db')
const {Schema} = mongoose

const logsSchema = new Schema({
    userId:String,
    token:String
})

const LogAuthentication = mongoose.model('LogAuthentication',logsSchema)

module.exports = LogAuthentication