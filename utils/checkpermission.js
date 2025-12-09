const CustomApiError = require('../errors/')

const checkPermission = async (req,resId)=>{
    console.log("^^^^ ^^^^^ ^^^^^^")
    console.log(req)
    if(req.user.role === 'admin') return;
    if(req.user.userId === resId.toString()) return;
        throw new CustomApiError.UnAuthorized('Not authorized to access this route')
}


module.exports = checkPermission