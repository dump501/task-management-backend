const middleWares = require("../middleware/index");
const apiRouter = require("express").Router()
const TaskController = require("../controllers/TaskController")
const CommentController = require("../controllers/CommentController")

apiRouter.route("/task")
.get(TaskController.index)
.post(
    [
        middleWares.validationMiddleware.validTaskParams
    ],
    TaskController.store
)

apiRouter.route("/task/:id")
.delete(TaskController.drop)
.patch(
    [
        middleWares.validationMiddleware.validTaskUpdateParams
    ],
    TaskController.update
)

apiRouter.route("/comment")
.get(
    [
        middleWares.validationMiddleware.validTaskCommentsParams
    ],
    CommentController.getTaskComments
)
.post(
    [
        middleWares.validationMiddleware.validCommentParams
    ],
    CommentController.store
)
apiRouter.route("/comment/:id")
.delete(CommentController.drop)


module.exports = apiRouter