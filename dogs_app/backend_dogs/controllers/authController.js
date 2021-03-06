const { verify }  = require('jsonwebtoken');
const { secret } = require('../config.js')
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");
const { Users } = require('../models')

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-zfwjpqk9.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'dogs_portal',
    issuer: 'https://dev-zfwjpqk9.us.auth0.com/',
    algorithms: ['RS256']
})

const checkToken = async (req, res, next) =>{
    try{
        const accessToken = req.headers.authorization.split(' ')[1];
        const userInfo = await axios.get('https://dev-zfwjpqk9.us.auth0.com/userinfo',{
            headers:{
                authorization: `Bearer ${accessToken}`
            }
        })
        req.UserSpecialInfo = userInfo.data
        return next()
    }catch(e){
        return res.json({error: 'Ошибка'})
    }
}

// const rolesCheck = (permission) => {
//     return (req, res, next) =>{
//
//     }
// }

const validateAuth = (req, res, next)=>{
    return next();
}


const rolesAuth = (permission) => {
    return async (req, res, next) =>{
        try{
            const login = req.UserSpecialInfo.email
            const candidate = await Users.findOne({where: {login: login}})
            const UserRole = candidate.role
                if (permission.includes(UserRole)){
                    return next();
                }else{
                    return res.json({
                        error: "Вы не имеете прав доступа для совершения этого действия"
                    })
                }
            }catch(e){
            return res.json({error: 'Возникла ошибка'});
        }
    }
}

module.exports = { validateAuth, rolesAuth, jwtCheck, checkToken };