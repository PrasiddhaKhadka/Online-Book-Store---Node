const { StatusCodes } = require('http-status-codes')
const CustomApiError = require('../errors/')
const  {attachCookiesToResponse } = require('../utils/index')
const Auth = require('../models/auth-model')
const AuthSchema = require('../models/auth-model')

const register = async(req,res)=>{
    const { username, email, password} = req.body;
    const emailExist = await AuthSchema.findOne({email})
    if(emailExist){
        throw new CustomApiError.BadRequestError("Email Already Exists")
    }
    
    const user = await AuthSchema.create({username,email,password})
    res.status(200).json({'hehehe':user})
    
}

const login = async(req,res)=>{
    
    const {email} = req.body
    const user = await Auth.findOne({email:email})
    if(!user){
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({
        msg:'Success',
        body:user
    })
}


module.exports = { register, login }