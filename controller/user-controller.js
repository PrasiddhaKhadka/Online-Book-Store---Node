const User = require('../models/auth-model')
const checkPermission = require('../utils/checkpermission')
const CustomApiError = require('../errors/')
const { createTokenUser,attachCookiestoResponse } = require('../utils/')

const getAllUsers = async(req,res)=>{
    const user = await User.find({role:'user'}).select('-password')
    res.status(200).json({msg:"Success",users:user})
}

const getUserDetails = async(req,res)=>{
    const { id } = req.params
    const userDetails = await User.findOne({_id: id}).select('-password')
  
    checkPermission({requestUser: req.user, resId:userDetails.id})

    res.status(200).json({msg:"Success",userDetails:userDetails})
}

const showMe = async(req,res)=>{
 res.status(200).json({ user: req.user });
}

const updateUser = async(req,res)=>{
    const { name , email } = req.body;
    if(!name || !email){
         throw new CustomApiError.BadRequest('Name or Email can not be null')
    }
    const user = await User.findOne({email: email})
    if(!user){
         throw new CustomApiError.NotFound('User can not be found')
    }
    user.email = email;
    user.username = name;

    await  user.save();

    const tokenUser = createTokenUser({user:user})
    attachCookiestoResponse(res,tokenUser)
    res.status(200).json({msg:"Success",user:tokenUser})
}

const updateUserPassword = async(req,res)=>{
    const { oldPassword, newPassword } = req.body;
    if(!oldPassword || !newPassword){
        throw new CustomApiError.BadRequest('Old password or New password is missing')
    }
    const user = await User.findById({_id: req.user.userId})
    const isPasswordMatch = await  user.comparePassword(oldPassword)
    if(!isPasswordMatch){
        throw new CustomApiError.BadRequest('User password donot match with old password.')
    }
    user.password = newPassword;
    await user.save()
    res.status(200).json({msg:'Success, Password has been updated'})
}

module.exports ={
    getAllUsers,
    getUserDetails,
    showMe,
    updateUser,
    updateUserPassword
}