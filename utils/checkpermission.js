const CustomApiError = require('../errors/')

const checkPermission = async ({requestUser,resId})=>{
  
        if(requestUser.role === 'admin') return;
         if(requestUser.userId === resId.toString()) return;
        throw new CustomApiError.UnAuthorized('Not authorized to access this route')   
    
}


module.exports = checkPermission