const middleWares = require("../middleware/index");
const adminRouter = require("express").Router();
const TaskController = require("../controllers/TaskController");
const CommentController = require("../controllers/CommentController");
const UserController = require("../controllers/UserController");

// =========================== admin specific routes ========================
adminRouter
  .route("/user/:id")
  .patch(UserController.adminUpdate)
  .delete(UserController.drop);

module.exports = adminRouter;
