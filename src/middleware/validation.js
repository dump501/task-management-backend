const TaskEnum = require("../enums/TaskEnum");
const HttpStatus = require("../helpers/HttpStatus");
const Logger = require("../helpers/Logger");
const Message = require("../helpers/Message");

const validRegisterParams = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (name && email && password) {
            next()
        } else {
            res.status(HttpStatus.badRequest)
                .json({ error: `name, email, and password fields are required` })
        }
    } catch (error) {
        Logger.error(error)
        res.status(HttpStatus.internalError)
            .json({ error: Message.serverError })
    }
}

const validLoginParams = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            next()
        } else {
            res.status(HttpStatus.badRequest)
                .json({ error: `email, and password fields are required` })
        }
    } catch (error) {
        Logger.error(error)
        res.status(HttpStatus.internalError)
            .json({ error: Message.serverError })
    }
}

const validTaskParams = async (req, res, next) => {
    try {
        const { title, description, deadline, tag } = req.body
        if (title && description && deadline && tag) {
            next()
        } else {
            res.status(HttpStatus.badRequest)
                .json({ error: `title, description, tag and deadline fields are required` })
        }

    } catch (error) {
        Logger.error(error)
        res.status(500).json({ error: Message.serverError })
    }
}

const validTaskUpdateParams = async (req, res, next) => {
    try {
        const {
            title,
            description,
            current_status,
            deadline,
            tag,
            assigned_to
        } = req.body

        if (!TaskEnum.isCurrentStatusValid(current_status)) {
            return res.json({ error: "Invalid current_status field" })
        }
        
        if (
            title && description &&
            deadline && tag &&
            current_status
            && assigned_to
        ) {
            next()
        } else {
            return res.status(HttpStatus.badRequest)
                .json({ error: `title, description, tag, deadline, current_status fields are required` })
        }

    } catch (error) {
        Logger.error(error)
        res.status(500).json({ error: Message.serverError })
    }
}


const validationMiddleware = {
    validRegisterParams,
    validLoginParams,
    validTaskParams,
    validTaskUpdateParams
}

module.exports = validationMiddleware