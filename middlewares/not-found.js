const { StatusCodes } = require('http-status-codes')

const notFound = async(req,res,next)=>{
    res.status(StatusCodes.NOT_FOUND).json({
        msg:"Route Not Found"
    })
}


module.exports = notFound;