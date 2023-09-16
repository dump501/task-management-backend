const TaskEnum = require("../enums/TaskEnum");
const HttpStatus = require("../helpers/HttpStatus");
const Logger = require("../helpers/Logger");
const Message = require("../helpers/Message");
const UserService = require("../services/UserService");

const validateRequiredFields = (body, fields) => {
    let requiredFields = []
    for (const field of fields) {
        if (!Object.keys(body).includes(field)) {
            requiredFields.push(field)
        }
    }

    return requiredFields
}

const validateRequiredUrlFields = (req, fields) => {
    console.log(req.query);
    let requiredFields = []
    for (const field of fields) {
        if (!Object.keys(req.query).includes(field)) {
            requiredFields.push(field)
        }
    }

    return requiredFields
}

const validRegisterParams = async (req, res, next) => {
    const { email } = req.body
    let userService = new UserService()
    const requiredFields = validateRequiredFields(
        req.body,
        ["name", "email", "password"]
    )
    if (requiredFields.length !== 0) {
        return res.status(HttpStatus.badRequest).json({ requiredFields })
    }
    const result = await userService.findOneByfield("email", email)
    if (result) {
        return res.status(HttpStatus.badRequest).json({ error: "Email already exists" })
    }
    next()
}

const validLoginParams = async (req, res, next) => {
    const requiredFields = validateRequiredFields(
        req.body,
        ["email", "password"]
    )
    if (requiredFields.length !== 0) {
        return res.status(HttpStatus.badRequest).json({ requiredFields })
    }
    next()
}

const validTaskParams = async (req, res, next) => {
    const requiredFields = validateRequiredFields(
        req.body,
        ["title", "description", "deadline", "tag"]
    )
    if (requiredFields.length !== 0) {
        return res.status(HttpStatus.badRequest).json({ requiredFields })
    }
    next()
}

const validTaskUpdateParams = async (req, res, next) => {
    const { current_status } = req.body

    const requiredFields = validateRequiredFields(
        req.body,
        ["title", "description", "deadline", "tag", "current_status", "assigned_to"]
    )
    if (requiredFields.length !== 0) {
        return res.status(HttpStatus.badRequest).json({ requiredFields })
    }

    if (!TaskEnum.isCurrentStatusValid(current_status)) {
        return res.json({ error: "Invalid current_status field" })
    }

    next()
}

const validCommentParams = async (req, res, next) => {
    const requiredFields = validateRequiredFields(req.body, ["content", "task_id"])
    if (requiredFields.length !== 0) {
        return res.status(HttpStatus.badRequest).json({ requiredFields })
    }

    next()
}

const validTaskCommentsParams = async (req, res, next) => {
    const requiredFields = validateRequiredUrlFields(req, ["task_id"])
    if (requiredFields.length !== 0) {
        return res.status(HttpStatus.badRequest).json({ requiredFields })
    }
    
    next()

}


const validationMiddleware = {
    validRegisterParams,
    validLoginParams,
    validTaskParams,
    validTaskUpdateParams,
    validCommentParams,
    validTaskCommentsParams
}

module.exports = validationMiddleware