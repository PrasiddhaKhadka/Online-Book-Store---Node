const User = require('../models/auth-model')
const checkPermission = require('../utils/checkpermission')

const getAllUsers = async(req,res)=>{
    const user = await User.find({role:'user'}).select('-password')
    res.status(200).json({msg:"Success",users:user})
}

const getUserDetails = async(req,res)=>{
    const { id } = req.params
    const userDetails = await User.findOne({_id: id}).select('-password')
    checkPermission(req.user, userDetails.id)
    res.status(200).json({msg:"Success",userDetails:userDetails})
}

const showMe = async(req,res)=>{
 res.status(200).json({ user: req.user });
}

const updateUser = async(req,res)=>{
 res.status(200).json({msg:"Success"})
}

const updateUserPassword = async(req,res)=>{
    res.status(200).json({msg:'Success'})
}

module.exports ={
    getAllUsers,
    getUserDetails,
    showMe,
    updateUser,
    updateUserPassword
}