const HttpStatus = require("../helpers/HttpStatus");
const Message = require("../helpers/Message");
const CommentService = require("../services/CommentService")


const store = async (req, res) => {
    console.log("req", req.userId);
    try {
        let commentService = new CommentService()
        const { content, task_id } = req.body;

        let data = {
            content,
            task_id,
            user_id: req.userId
        }

        const result = await commentService.save(data)
        if (result) {
            return res.json({ message: "Comment registrated successfully" })
        }
        return res.status(HttpStatus.internalError)
            .json({ error: Message.serverError })
    } catch (error) {
        console.error(error)
        return res.status(HttpStatus.internalError)
            .json({ error: Message.serverError })
    }
}

const getTaskComments = async (req, res) => {
    try {
        let commentService = new CommentService()
        const { task_id } = req.query
        const result = await commentService.getTaskComments(task_id)
        if (result) {
            return res.json({ data: result })
        }
    } catch (error) {
        console.error(error)
        return res.status(HttpStatus.internalError)
            .json({ error: Message.serverError })
    }
}


const drop = async (req, res) => {
    try {
        let commentService = new CommentService()
        let result = await commentService.delete(req.params.id)
        if (result) {
            return res.json({ message: "Comment deleted successfully" })
        }
        return res.status(500).json({ error: Message.serverError })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: Message.serverError })
    }
}

module.exports = {
    store,
    drop,
    getTaskComments
}