const User = require('../models/auth-model')
const CustomApiError = require('../errors/')
const { StatusCodes } = require('http-status-codes');
const { createJwt,
    isValid,
    attachCookiestoResponse,createTokenUser } = require('../utils/index');




const register = async(req,res)=>{
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        throw new CustomApiError.BadRequest(`${username}, ${email} or ${password} is empty`)
    }

    const userEmail = await User.findOne({
        email:email
    })
    if(userEmail){
        throw new CustomApiError.BadRequest('Email already exists');
    }

    const isFirstAccount = await User.countDocuments({}) === 0 
    const role = isFirstAccount ? 'admin' : 'user';
    const user = await User.create({
        username, 
        email,
        password,
        role
    })
    const tokenUser = createTokenUser({user})
    attachCookiestoResponse(res,tokenUser)
    res.status(StatusCodes.CREATED).json({
        msg:"Success",
        user:user
    })

}

const login = async(req,res)=>{
    const { email, password} = req.body;
    if(!email || !password){
        throw new CustomApiError.BadRequest('User or Password can not be null')
    }
    const user = await User.findOne({ email })
    if(!user){
        throw new CustomApiError.NotFound('User Not Found with this email')
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new CustomApiError.BadRequest('The password is incorrect')
    }

    // console.log(user)
    const tokenUser = createTokenUser({user})
    attachCookiestoResponse(res,tokenUser)
    res.status(StatusCodes.OK).json({ user: user });

}

const logout = async(req,res)=>{
      res.status(StatusCodes.OK).json({
        msg:"Logout"
    })
}


module.exports = {
    login,
    register,
    logout
}