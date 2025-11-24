const CustomApiError = require("../errors/custom-api-error");
const { StatusCodes } = require("http-status-codes")

const errorHandler = (err,req,res,next)=>{
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, Try again Later'
    }
    if(err instanceof CustomApiError){
        res.status(err.statusCode).json({msg: err.message})
    }

    if(err.name === 'ValidationError'){
        customError.statusCode = 400
        customError.msg =  Object.values(err.errors).map((item)=>item.message).join(',')
    }
    
    return res.status(customError.statusCode).json({msg: customError.msg})
    
}

module.exports = errorHandler;