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
const removeLogToken = async (req,res)=>{
    const log = await LogAuthentication.findOne({userId:req.user._id.toString()})

    if(log){
        await LogAuthentication.deleteOne({userId:req.user._id.toString()})
    }else{
        res.status(422).json({msg:'Invalid log',isSuccess:false})
        return
    }
    res.status(200).json({msg:'token apagado',isSuccess:true})
}
const CheckIfTheUserIsAlreadyLoggedIn = async (userId) => {
    const log = await LogAuthentication.findOne({userId})
    if(log){
        return true        
    }else{
        return false 
    }
}

module.exports = {saveUserAndToken,removeLogToken,CheckIfTheUserIsAlreadyLoggedIn}