const CustomApiError = require('../errors/')
const { isTokenValid } = require('../utils/jwt_token')

const authorizationMiddleware=async(req,res,next)=>{
    const token = req.signedCookies.token;
    if(!token){
        throw new CustomApiError.UnAuthorized('Authentication Invalid')
    }
    try {
       
        const { username, userId, role } = isTokenValid(token) 
        req.user = {
            username: username,
            userId: userId,
            role:role
        }
        next()
    } catch (error) {
        // console.log(error)
        throw new CustomApiError.UnAuthorized('Authentication Invalid');
    }
   
}


const authorizePermission=(...roles)=>{
   return async(req,res,next)=>{
    if(!roles.includes(req.user.role)){
        throw new CustomApiError.UnAuthorized(' Unauthorized to access this route ')
    };
    next();
   };
};


module.exports = {
    authorizationMiddleware,
    authorizePermission,
}