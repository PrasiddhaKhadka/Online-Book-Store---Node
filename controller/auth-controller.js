const { StatusCodes } = require('http-status-codes')
const { BadRequest } = require("../errors")
const Auth = require('../models/auth-model')

const register = async(req,res)=>{
    const user = await Auth.create(req.body)
    if(!user){
        throw BadRequest("Please enter name, email and password")
    }
    const token =  user.createJwt()
    res.status(StatusCodes.CREATED).json({
        msg: 'Success',
        body:{
            user:user,
            token:token
        }
    }
    )
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