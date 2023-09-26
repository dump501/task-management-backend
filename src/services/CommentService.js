const { executeQuery, emptyOrRows } = require("./DatabaseService");
const Service = require("./Service");

class CommentService extends Service {
  constructor() {
    super("comments");
  }

  async getTaskComments(task_id) {
    try {
      const query = `SELECT comments.*, 
            users.email AS email , users.name AS name, users.profile AS profile
            FROM comments
            JOIN users ON 
            comments.user_id=users.id
            WHERE comments.task_id=?
            ORDER BY comments.id DESC`;

      const [results] = await executeQuery(query, [task_id]);
      const result = emptyOrRows(results);

      return result;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = CommentService;
