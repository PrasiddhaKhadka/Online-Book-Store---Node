const User = require('../models/auth-model')
const { StatusCodes }= require('http-status-codes')
const CustomApiError = require('../errors/')
const { attachCookiesToResponse, createTokenUser } = require('../utils')

const register = async(req,res)=>{
    const { username,email,password}= req.body;
    if(!email || !username || !password){
        throw new CustomApiError.BadRequest('Email, username or password missing')
    }
    const emailExist = await User.findOne({email:email})

    if(emailExist){
        throw new CustomApiError.BadRequest('Email Already Exist')
    }

    // FIRST ACCOUNT TO BE ADMIN 
    const isFirstUser = await User.countDocuments({}) === 0;
    
    const role = isFirstUser? 'admin':'user'
    
    const user = await User.create({username,email,password,role})
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user: tokenUser})
    res.status(StatusCodes.CREATED).json({msg:'Success',user:tokenUser})
}

const login=async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new CustomApiError.BadRequest('Email or password can not be empty')
    }


    const user = await User.findOne({email:email})

    if(!user){
        throw new CustomApiError.NotFound('User Not Found');
    }

    // MATCHING PASSOWORD:
    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch){
        throw new CustomApiError.BadRequest('Invalid Credentials')
    }
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user: tokenUser})
    res.status(StatusCodes.OK).json({msg:'Success',user:tokenUser})
}

const logout = async(req,res)=>{

    res.cookie('token','logout',{
        httpOnly:true,
        expires: new Date(Date.now()),
        secure:true,

    })
    res.status(StatusCodes.OK).json({msg:'User logged Out'})
}

module.exports = {
    register,
    login,
    logout
}