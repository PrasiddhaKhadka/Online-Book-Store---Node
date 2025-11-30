const User = require('../models/auth-model')
const { StatusCodes }= require('http-status-codes')
const CustomApiError = require('../errors/')

const register = async(req,res)=>{
    const { username,email,password}= req.body;
    if(!email || !username || !password){
        throw new CustomApiError.BadRequest('Email, username or password missing')
    }
    const emailExist = await User.findOne({email:email})

    if(emailExist){
        throw new CustomApiError.BadRequest('Email Already Exist')
    }
    

    const user = await User.create({username,email,password})
    res.status(StatusCodes.CREATED).json({msg:'Success',user:user})
}

const login=async(req,res)=>{
    res.status(200).json({msg:'Login'})
}

module.exports = {
    register,
    login
}