const mongoose  = require('mongoose')
const User = require('../models/auth-model')
const { StatusCodes } = require('http-status-codes')
const CustomApiError = require('../errors')
const { checkPermission } = require('../utils')

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
    checkPermission(req.user, user._id)
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
    const { email, name} = req.body;
    if(!email || !name){
        throw new CustomApiError.BadRequest('Please provide all values');
    }
    const user = await User.findOne({ _id: req.user.userId });
    user.email= email;
    user.name = name;
    await user.save();

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });
}

const updateUserPassword = async(req,res)=>{
    const { currentPassword, newPassword} = req.body;
    const userId = req.user.userId;

    if(!currentPassword || !newPassword){
        throw new CustomApiError.BadRequest('Current password or new password field can not be empty')
    }

    try {
        const user = await User.findOne({_id:userId})
        if(!user){
            throw new CustomApiError.NotFound('User with this id not found')
        }
        // COMPARE PASSWORD
        const isMatch = await user.comparePassword(currentPassword)
        if(!isMatch){
            throw new CustomApiError.UnAuthorized('Incorrect old password')
        }
        user.password = newPassword

        await user.save();
        res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
    } catch (error) {
        throw new CustomApiError.UnAuthorized(error.msg)
    }
}

const deleteUserAccount = async(req,res)=>{
    const userId = req.user.userId;
    const user = await User.findByIdAndDelete({_id: userId})
    res.status(StatusCodes.GONE).json({msg:"Success",user:user})
}

module.exports = {
    getAllUsers,
    getUserDetails,
    showMe,
    updateUser,
    updateUserPassword,
    deleteUserAccount
}