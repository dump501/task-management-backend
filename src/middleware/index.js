const validationMiddleware = require("./validation")
const authenticationMiddleware = require("./authentication")
const authorizationMiddleware = require("./authorization")

module.exports = {
    validationMiddleware,
    authenticationMiddleware,
    authorizationMiddleware
}