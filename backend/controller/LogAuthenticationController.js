const LogAuthentication = require("../models/LogAuthentication")

const saveUserAndToken = (userId,token) => {
    const log = new LogAuthentication({
        userId,
        token,
        expireAt: new Date(Date.now() + 86400000)
    })
    const userLog = log.save()
    return userLog 
}

module.exports = {saveUserAndToken}