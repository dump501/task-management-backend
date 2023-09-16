const TaskEnum = require("../enums/TaskEnum");
const HttpStatus = require("../helpers/HttpStatus");
const Message = require("../helpers/Message");
const { getCurrentDateTime } = require("../helpers/helper");
const TaskService = require("../services/TaskService")


const store = async (req, res) => {
    console.log("req", req.userId);
    try {

        let taskService = new TaskService()
        const { title, description, deadline, tag, assigned_to, current_status } = req.body;

        let data = {
            title,
            description,
            deadline,
            tag,
            created_by: req.userId,
            current_status: TaskEnum.assigned
        }
        if (assigned_to) {
            data["assigned_to"] = assigned_to
            data["assigned_by"] = req.userId
            data["assigned_date"] = getCurrentDateTime()
        }
        if (current_status) {
            data["current_status"] = current_status
        }

        const result = await taskService.save(data)
        console.log("result", result);
        if (result) {
            return res.json({ message: "User registrated successfully" })
        }
        return res.status(HttpStatus.internalError)
            .json({ error: Message.serverError })
    } catch (error) {
        res.status(500).json({ error: Message.serverError })
    }
}

const index = async (req, res) => {
    try {
        let taskService = new TaskService()
        let result = await taskService.findAllWithRelations()
        if (result) {
            return res.json({ data: result })
        }
        return res.status(500).json({ error: Message.serverError })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: Message.serverError })
    }
}

const update = async (req, res) => {
    try {
        let taskService = new TaskService()
        const {
            title,
            description,
            current_status,
            deadline,
            tag,
            assigned_to
        } = req.body

        let data = {
            title,
            description,
            current_status,
            deadline,
            tag,
            assigned_to
        }

        const result = await taskService.update(req.params.id, data)
        if (result) {
            return res.json({ message: "User updated successfully" })
        }
        res.status(500).json({ error: Message.serverError })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: Message.serverError })
    }
}

const drop = async (req, res) => {
    try {
        let taskService = new TaskService()
        let result = await taskService.delete(req.params.id)
        if (result) {
            return res.json({ message: "User deleted successfully" })
        }
        res.status(500).json({ error: Message.serverError })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: Message.serverError })
    }
}

const show = async(req, res) => {
    try {
        // let taskService = new TaskService()
        // let 
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: Message.serverError })
    }
}

module.exports = {
    store,
    index,
    update,
    drop,
    show
}