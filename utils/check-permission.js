const CustomApiError = require('../errors')
const checkPermission = (requestUser, resourceUserId)=>{
    if(requestUser.role === 'admin') return;
    if(requestUser.userId == resourceUserId.toString())return;
    throw new CustomApiError.UnAuthorized('NO PERMISSION')
}

module.exports = checkPermission;