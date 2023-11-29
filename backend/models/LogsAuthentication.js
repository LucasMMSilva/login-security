const mongoose = require('../config/db')
const {Schema} = mongoose

const logsSchema = new Schema({
    userId:String,
    token:String
})

const LogsAuthentication = mongoose.model('LogsAuthentication',logsSchema)

module.exports = LogsAuthentication