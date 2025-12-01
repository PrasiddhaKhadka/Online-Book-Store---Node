const mongoose  = require('mongoose')
const User = require('../models/auth-model')
const { StatusCodes } = require('http-status-codes')
const CustomApiError = require('../errors')

const getAllUsers=async(req,res)=>{
    const users = await User.find({role:'user'}).select('-password')
    res.status(StatusCodes.OK).json({msg:'Hello World',users:users})
}

const getUserDetails = async(req,res)=>{

   // VALIDATING THE ID
   const { id } = req.params
   if(!mongoose.Types.ObjectId.isValid(id)){
        throw new CustomApiError.NotFound('The product is not found or the id is invalid')
   }
    const user = await User.findOne({_id:req.params.id}).select('-password')
    res.status(StatusCodes.OK).json({
        msg:'Success',
        user:user
    })
}

const showMe = async(req,res)=>{
    res.status(StatusCodes.OK).json({
        msg:'Success',
        user:req.user
    })
}

const updateUser = async(req,res)=>{
    res.status(200).json({msg:"Hello Updating the password"})
}

const updateUserPassword = async(req,res)=>{
    res.status(200).json({msg:"Hello from updating password"})
}

const deleteUserAccount = async(req,res)=>{
    res.status(200).json({msg:"Hello from deleting account"})
}

module.exports = {
    getAllUsers,
    getUserDetails,
    showMe,
    updateUser,
    updateUserPassword,
    deleteUserAccount
}