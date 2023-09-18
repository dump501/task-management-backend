const { secret } = require("../../config/auth.config")
const HttpStatus = require("../helpers/HttpStatus")
const jwt = require("jsonwebtoken")

const isAuthenticated = (req, res, next) => {
    let bearerHeader = req.headers["authorization"];
    if(!bearerHeader){
        return res.status(HttpStatus.forbidden).json({error: "Unauthorized"})
    }

    let token = bearerHeader.split(" ")[1];

    if(!token){
        return res.status(HttpStatus.forbidden).json({error: "Unauthorized"})
    }

    jwt.verify(
        token,
        secret,
        (err, decoded) => {
            if(err){
                return res.status(HttpStatus.unauthorized).json({error: "unauthorized"})
            }
            req.userId = decoded.id
            return next()
        }
    )
}

const authenticationMiddleware = {
    isAuthenticated,
}

module.exports = authenticationMiddleware;