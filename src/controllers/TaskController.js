const TaskEnum = require("../enums/TaskEnum");
const HttpStatus = require("../helpers/HttpStatus");
const Message = require("../helpers/Message");
const { getCurrentDateTime } = require("../helpers/helper");
const TaskService = require("../services/TaskService");
const UserService = require("../services/UserService");
const {
  renderTaskAssignEmail,
  renderTaskStatusEmail,
} = require("../views/email/views");
const { sendMail } = require("../services/EmailService");

const store = async (req, res) => {
  console.log("req", req.userId);
  try {
    let taskService = new TaskService();
    const { title, description, deadline, tag, assigned_to, current_status } =
      req.body;

    let data = {
      title,
      description,
      deadline,
      tag,
      created_by: req.userId,
      current_status: TaskEnum.assigned,
    };
    if (assigned_to) {
      data["assigned_to"] = assigned_to;
      data["assigned_by"] = req.userId;
      data["assigned_date"] = getCurrentDateTime();
    }
    if (current_status) {
      data["current_status"] = current_status;
    }

    const result = await taskService.save(data);
    if (result) {
      let userService = new UserService();

      // send assignment email
      if (assigned_to) {
        let user = await userService.findOneById(assigned_to);
        sendMail({
          to: user.email,
          subject: "Task assignment",
          html: renderTaskAssignEmail(user.name, title),
        });
      }
      return res.json({ message: "User registrated successfully" });
    }
    return res
      .status(HttpStatus.internalError)
      .json({ error: Message.serverError });
  } catch (error) {
    res.status(500).json({ error: Message.serverError });
  }
};

const index = async (req, res) => {
  try {
    let taskService = new TaskService();
    let result = await taskService.findAllWithRelations();
    if (result) {
      return res.json({ data: result });
    }
    return res.status(500).json({ error: Message.serverError });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.serverError });
  }
};

const update = async (req, res) => {
  try {
    let taskService = new TaskService();
    const { title, description, current_status, deadline, tag, assigned_to } =
      req.body;
    let data = {};
    // admin
    if (parseInt(req.userId) === 1) {
      if (assigned_to) data["assigned_to"] = assigned_to;
      if (current_status) data["current_status"] = current_status;
      if (deadline) data["deadline"] = deadline;
      if (title) data["title"] = title;
      if (description) data["description"] = description;
      if (tag) data["tag"] = tag;
    }

    // user
    if (parseInt(req.userId) === 2) {
      if (current_status) data["current_status"] = current_status;
    }

    const result = await taskService.update(req.params.id, data);
    if (result) {
      let userService = new UserService();

      // send assignment email
      if (assigned_to) {
        let user = await userService.findOneById(assigned_to);
        let task = await taskService.findOneById(req.params.id);
        sendMail({
          to: user.email,
          subject: "Task assignment",
          html: renderTaskAssignEmail(user.name, task.title),
        });
      }

      // send status email
      if (current_status) {
        let task = await taskService.findOneById(req.params.id);
        let user = await userService.findOneById(task.assigned_to);
        sendMail({
          to: user.email,
          subject: "Task status update",
          html: renderTaskStatusEmail(
            user.name,
            task.title,
            task.current_status
          ),
        });
      }
      return res.json({ message: "User updated successfully" });
    }
    res.status(404).json({ error: "Task not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.serverError });
  }
};

const drop = async (req, res) => {
  try {
    let taskService = new TaskService();
    let result = await taskService.delete(req.params.id);
    if (result) {
      return res.json({ message: "User deleted successfully" });
    }
    res.status(500).json({ error: Message.serverError });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.serverError });
  }
};

const show = async (req, res) => {
  try {
    // let taskService = new TaskService()
    // let
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.serverError });
  }
};

const getUserTasks = async (req, res) => {
  try {
    let taskService = new TaskSercice();
    let result = await taskService.findByFieldWithRelations(
      "assigned_to",
      req.userId
    );
    if (result) {
      return res.json({ data: result });
    }
    return res
      .status(HttpStatus.internalError)
      .json({ error: Message.serverError });
  } catch (error) {
    console.error(error);
    return res
      .status(HttpStatus.internalError)
      .json({ error: Message.serverError });
  }
};

module.exports = {
  store,
  index,
  update,
  drop,
  show,
  getUserTasks,
};
