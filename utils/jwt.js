const jwt = require('jsonwebtoken')

const createJwt = ({ payload })=>{
    const token =  jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn:'30d'
        }
    )
    return token;
}


const isTokenValid = (token)=> jwt.verify(token,process.env.JWT_SECRET)


const attachCookiesToResponse = async({ res,user })=>{
    const token =  createJwt({ payload:user });

    const sevenDay = 1000 * 60 * 60 * 24 * 7;
    res.cookie(
        'token',
        token,
        {
            httpOnly: true,
            expires: new Date(Date.now() + sevenDay),
            secure: process.env.NODE_ENV === 'production',
            signed: true,
        }
    );
    
}


module.exports = { createJwt, isTokenValid, attachCookiesToResponse}
