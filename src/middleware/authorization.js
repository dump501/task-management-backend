const HttpStatus = require("../helpers/HttpStatus");
const UserService = require("../services/UserService");

const isAdmin = async (req, res, next) => {
    let userService = new UserService()
    let user = await userService.findOneById(req.userId)
    if(user.role_id === 1){
        return next()
    }
    res.status(HttpStatus.unauthorized)
    .json({error: "Unauthorized"})
}

const authorizationMiddleware = {
    isAdmin,
}

module.exports = authorizationMiddleware;