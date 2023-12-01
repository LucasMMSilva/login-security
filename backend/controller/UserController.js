const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {saveUserAndToken} = require('./LogAuthenticationController')
const {CheckIfTheUserIsAlreadyLoggedIn} = require('./LogAuthenticationController')

const generateToken = (id)=>{
    const token = jwt.sign({id},process.env.JWTSECRET,{expiresIn:'1d'})
    saveUserAndToken(id,token)
    return token
}

const register = async (req,res)=>{
    const {username,email,password} = req.body
    // validate username
    const findUsername = await User.findOne({username:username})
    if(findUsername){
        res.status(422).json({errors:"This username is already in use!",type:'REGISTER username'})
        return
    }
    if(!username){
        res.status(422).json({errors:"Username is required!",type:'REGISTER username'})
        return
    }
    if(!username.length >= 3){
        res.status(422).json({errors:"The username must be longer than three characters!",type:'REGISTER username'})
        return
    }

    //validate email
    const findEmail = await User.findOne({email:email})
    if(findEmail){
        res.status(422).json({errors:"This email is already in use!",type:'REGISTER email'})
        return
    }
    if(!email){
        res.status(422).json({errors:"Email is required!",type:'REGISTER email'})
        return
    }
    if(email.includes('@')){
        const emailArrayValidate = email.split('@')
        if(emailArrayValidate[0].length>=3){
            if(emailArrayValidate[1].includes('.')){
                const domainArrayValidate = emailArrayValidate[1].split('.')
                if(domainArrayValidate[0].length > 0){
                    if(!domainArrayValidate[1].length > 0){
                        res.status(422).json({errors:"Invalid email!",type:'REGISTER email'})
                        return
                    }
                }else{
                    res.status(422).json({errors:"Invalid email!",type:'REGISTER email'})
                    return
                }
            }else{
                res.status(422).json({errors:"Invalid email!",type:'REGISTER email'})
                return
            }
        }else{
            res.status(422).json({errors:"Invalid email!",type:'REGISTER email'})
            return
        }
    }else{
        res.status(422).json({errors:"Invalid email!",type:'REGISTER email'})
        return
    }

    //validate password
    if(!password){
        res.status(422).json({errors:"Invalid password!",type:'REGISTER password'})
        return
    }

    if(password.length < 5){
        res.status(422).json({errors:"Password must be greater than or equal to 5 characters.",type:'REGISTER password'})
        return
    }

    //password hash
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password,salt)

    const user = new User({
        username,
        email,
        password:passwordHash
    })

    const newUser = await user.save()

    res.status(201).json({token:generateToken(newUser._id)})
}

const login = async(req,res)=>{
    const {email,password} = req.body
    
    const user = await User.findOne({email})

    if(!user){
        res.status(422).json({errors:'This email is not registered in our system, you must have typed something wrong.',type:'LOGIN email'})
        return
    }
    const passwordMatch = await bcrypt.compare(password,user.password)
    if(!passwordMatch){
        res.status(422).json({errors:'Incorrect password.',type:'LOGIN password'})
        return
    }

    const isLogged = await CheckIfTheUserIsAlreadyLoggedIn(user._id.toString())
    console.log('2 '+isLogged)
    if(isLogged){
        res.status(422).json({errors:'Logged user.',type:'LOGIN logUser',isLogged:true})
        return
    }

    res.status(201).json({token: generateToken(user._id)})
    
}

const getUserById = async(req,res)=>{
    const userid = req.user.id
    
    const data = await User.findById(userid).select('-password')
    if(!data){
        res.status(404).json({errors:'User dont found.',type:'LOGIN password'})
        return
    }
    res.status(201).json(data)
}

module.exports = {
    register,
    login,
    getUserById
}