const CustomApiError = require("../errors/custom-api-error");
const { StatusCodes } = require("http-status-codes")

const errorHandler = (err,req,res,next)=>{
    console.log(err)
    if(err instanceof CustomApiError){
        res.status(err.statusCode).json({msg: err.message})
    }
    else{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Internal Server Error"})
    }
}

module.exports = errorHandler;