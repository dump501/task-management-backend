const HttpStatus = require("../helpers/HttpStatus");
const Message = require("../helpers/Message");
const UserService = require("../services/UserService");

const profile = async (req, res) => {
    try {
        let userService = new UserService()
        let result = await userService.findOneById(req.userId)
        if (result) {
            return res.json({ data: result })
        }
        return res.status(HttpStatus.internalError)
            .json({ error: Message.serverError })
    } catch (error) {
        console.error(error)
        return res.status(HttpStatus.internalError)
            .json({ error: Message.serverError })
    }
}


const update = async (req, res) => {
    try {
        let userService = new UserService()
        const {
            name,
            profile
        } = req.body

        let data = {};
        if(name) data["name"] = name
        if(name) data["profile"] = profile

        const result = await userService.update(req.userId, data)
        if (result) {
            return res.json({ message: "User updated successfully" })
        }
        res.status(HttpStatus.notFound)
        .json({ error: "User not found" })
    } catch (error) {
        console.error(error)
        return res.status(HttpStatus.internalError)
            .json({ error: Message.serverError })
    }
}

const show = async (req, res) => {
    try {
        let userService = new UserService()
        const result = await userService.findOneById(req.params.id)
        if (result) {
            return res.json({ data: result })
        }
        res.status(HttpStatus.notFound)
            .json({ error: "User not found" })
    } catch (error) {
        console.error(error)
        return res.status(HttpStatus.internalError)
            .json({ error: Message.serverError })
    }
}

const drop = async (req, res) => {
    try {
        let userService = new UserService()
        let result = await userService.delete(req.params.id)
        if (result) {
            return res.json({ message: "User deleted successfully" })
        }
        return res.status(500).json({ error: Message.serverError })
    } catch (error) {
        console.error(error)
        return res.status(HttpStatus.internalError)
            .json({ error: Message.serverError })
    }
}

const adminUpdate = async (req, res) => {
    try {
        console.log(req.body);
        let userService = new UserService()
        let user = await userService.findOneById(req.params.id)
        if (user) {
            const {
                role_id,
                is_active
            } = req.body
            const data = {
                role_id: role_id || user.role_id,
                is_active: is_active || user.is_active
            }
            const result = await userService.update(req.params.id, data)
            if (result) {
                return res.json({ message: "User updated successfully" })
            }
        }
        return res.status(HttpStatus.notFound)
            .json({ error: Message.serverError })
    } catch (error) {
        console.error(error)
        return res.status(HttpStatus.internalError)
            .json({ error: Message.serverError })
    }
}



module.exports = {
    profile,
    drop,
    update,
    show,
    adminUpdate
}