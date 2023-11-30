const LogAuthentication = require("../models/LogAuthentication")
const { deleteOne } = require("../models/User")

const saveUserAndToken = async (userId,token) => {
    const log = new LogAuthentication({
        userId,
        token,
        expireAt: new Date(Date.now() + 86400000)
    })
    const userLog = await log.save()
    return userLog 
}
const removeLogToken = async (userId)=>{
    await LogAuthentication.deleteOne(userId)
}

module.exports = {saveUserAndToken,removeLogToken}