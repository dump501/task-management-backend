const middleWares = require("../middleware/index");
const adminRouter = require("express").Router()
const TaskController = require("../controllers/TaskController")

adminRouter.route("/task")
.get(TaskController.index)
.post(
    [
        middleWares.validationMiddleware.validTaskParams
    ],
    TaskController.store
)

adminRouter.route("/task/:id")
.delete(TaskController.drop)
.patch(
    [
        middleWares.validationMiddleware.validTaskUpdateParams
    ],
    TaskController.update
)

module.exports = adminRouter