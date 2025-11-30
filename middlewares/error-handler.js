const CustomApiError = require("../errors/custom-api-error");
const { StatusCodes } = require("http-status-codes")

const errorHandler = (err,req,res,next)=>{
    // console.log("**************")
    // console.log(err)
    // console.log("**************")
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, Try again Later'
    }
    if(err instanceof CustomApiError){
        customError.statusCode = err.statusCode
        msg= err.msg
    }
    if(err.code && err.code === 11000){
        customError.statusCode = 400
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, Please enter another value`
    }

    if(err.name === 'ValidationError'){
        customError.statusCode = 400
        customError.msg =  Object.values(err.errors).map((item)=>item.message).join(',')
    }
    
    return res.status(customError.statusCode).json({msg: customError.msg})
    
}

module.exports = errorHandler;