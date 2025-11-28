const jwt = require('jsonwebtoken');

const createJwt = async({payload})=>{
    const token =  wt.sign(payload,
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPRIES,
        }
    )
    return token;
}

const isTokenValid = (token)=> jwt.verify(token,process.jwt.JWT_SECRET);

const attachCookiesToResponse = async({res,user})=> {
    const token = createJwt({payload:user})
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token',token,{
        httpOnly:true,
        expires: new Date(Date.now()+ oneDay),
        secure:process.env.NODE_ENV == 'production',
        signed:true
    })
}


module.exports = {
    createJwt,
    isTokenValid,
    attachCookiesToResponse,
}
