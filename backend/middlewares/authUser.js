const User = require('../models/User')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET
const authUser = async(req,res,next)=>{
    const authHeader = req.headers['authorization']
    
    const token = authHeader && authHeader.split(" ")[1];
    
    if(!token) return res.status(401).json({erros:["Acesso negado."]})

    try{
        const verified = jwt.verify(token,jwtSecret)
        const user = await User.findById(verified.id).select('-password')
        req.user = user
        next()
    }catch(error){
        return res.status(401).json({errors:["Token Invalido."]})
        
    }
}
module.exports = authUser