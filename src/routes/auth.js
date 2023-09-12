const AuthController = require("../controllers/AuthController");

const middleWares = require("../middleware/index");

const authRouter = require("express").Router();

authRouter.post(
    "/login",
    [
        middleWares.validationMiddleware.validLoginParams
    ],
    AuthController.login
)
authRouter.post(
    "/register", 
    [
        middleWares.validationMiddleware.validRegisterParams
    ],
    AuthController.register
)

module.exports = authRouter