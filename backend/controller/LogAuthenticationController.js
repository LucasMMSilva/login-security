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
    const log = await LogAuthentication.findOne(req.user.userId)
    if(log){
        await LogAuthentication.deleteOne(log)
    }else{
        res.status(422).json({msg:'Algo deu errado',isSuccess:false})
        return
    }
    res.status(200).json({msg:'token apagado',isSuccess:true})
}

module.exports = {saveUserAndToken,removeLogToken}