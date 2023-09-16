const middleWares = require("../middleware/index");
const apiRouter = require("express").Router();
const TaskController = require("../controllers/TaskController");
const CommentController = require("../controllers/CommentController");
const UserController = require("../controllers/UserController");

// tasks
apiRouter
  .route("/task")
  .get(TaskController.index)
  .post(
    [
      middleWares.validationMiddleware.validTaskParams,
      middleWares.authorizationMiddleware.isAdmin,
    ],
    TaskController.store
  );

apiRouter
  .route("/task/:id")
  .delete([middleWares.authorizationMiddleware.isAdmin], TaskController.drop)
  .patch(
    [
      middleWares.validationMiddleware.validTaskUpdateParams,
      middleWares.authorizationMiddleware.isAdmin,
    ],
    TaskController.update
  );

// comments
apiRouter
  .route("/comment")
  .get(
    [middleWares.validationMiddleware.validTaskCommentsParams],
    CommentController.getTaskComments
  )
  .post(
    [middleWares.validationMiddleware.validCommentParams],
    CommentController.store
  );
apiRouter.route("/comment/:id").delete(CommentController.drop);

// users
apiRouter
  .route("/user/profile")
  .get(UserController.profile)
  .post(
    [middleWares.validationMiddleware.validUserUpdateParams],
    UserController.update
  );

apiRouter.route("/user").get(UserController.index);

apiRouter
  .route("/user/:id")
  .get(UserController.show)
  .patch(UserController.update);

apiRouter.get("/user/task", TaskController.getUserTasks);

module.exports = apiRouter;
