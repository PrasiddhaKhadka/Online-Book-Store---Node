const jwt = require('jsonwebtoken')

const createJwt = (payload)=>{
    const token = jwt.sign(payload,
        process.env.JWT_SECRET,
        {
        expiresIn:'30d'
    },
)

    return token;
}


const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)


const attachCookiestoResponse = async (res,user)=>{
    const token = createJwt( user )
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token',token,{
        httpOnly:true,
        expiresIn:new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed:true
    });

}


module.exports = {
    createJwt,
    isTokenValid,
    attachCookiestoResponse
}