const createTokenUser= (user)=>{
    return {
        userId:user._id,
        username:user.username,
        role:user.role,
    }
}

module.exports = createTokenUser;