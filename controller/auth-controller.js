const { StatusCodes } = require('http-status-codes')
const Auth = require('../models/auth-model')

const register = async(req,res)=>{
    const user = await Auth.create(req.body)
    res.status(StatusCodes.CREATED).json({
        msg: 'Success',
        body:user
    }
    )
}

const login = async(req,res)=>{
    
    const {email} = req.body
    const user = await Auth.findOne({email:email})
    res.status(200).json({
        msg:'Success',
        body:user
    })
}


module.exports = { register, login }