const { secret } = require("../../config/auth.config");
const HttpStatus = require("../helpers/HttpStatus");
const { log } = require("../helpers/Logger");
const Message = require("../helpers/Message");
const User = require("../models/User");
const UserService = require("../services/UserService");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const login = async (req, res) => {

    try {
        let userService = new UserService();
        const { email, password } = req.body;

        const result = await userService.findOneByfield("email", email)
        console.log("result", result);
        if (result) {
            let user = new User()
            user.fromJson(result)
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign(
                    { id: user.id },
                    secret,
                    {
                        algorithm: 'HS256',
                        allowInsecureKeySizes: true,
                        expiresIn: 86400
                    }
                )
                res.json({
                    user: user.serialize(),
                    accessToken: token
                })
            } else {
                res.status(401).json({ error: "Incorrect password" })
            }
        } else {
            res.status(404).json({ error: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}

const register = async (req, res) => {
    // TODO: validate email
    try {
        let userService = new UserService();
        const { name, email, password } = req.body;

        const result = await userService.save({
            name,
            email,
            password: bcrypt.hashSync(password, 8),
            role_id: 2
        })
        console.log("result", result);
        if (result) {
            return res.json({ message: "User registrated successfully" })
        }
        return res.status(HttpStatus.internalError)
            .json({ message: Message.serverError })
    } catch (error) {
        res.status(500).json({ error })
    }

}

module.exports = {
    login,
    register
}