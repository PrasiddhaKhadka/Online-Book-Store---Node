const CustomApiError = require('../errors/')
const { isTokenValid } = require('../utils/')

const authenticactionMiddleware = (req,res,next)=>{
    const token = req.signedCookies.token;
    if(!token){
        throw new CustomApiError.UnAuthorized('Not Authenticated User')
    }
    try {
        const { username, userId, role} = isTokenValid(token)
        req.user={
            username:username,
            userId:userId,
            role:role
        };

        next();
    } catch (error) {
        throw new CustomApiError.UnAuthorized('Not Authenticated User')
    }
}


const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomApiError.UnAuthorized(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

module.exports = { authenticactionMiddleware, authorizePermissions }