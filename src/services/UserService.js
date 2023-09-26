const { executeQuery, emptyOrRows } = require("./DatabaseService");
const Service = require("./Service");

class UserService extends Service {
  constructor() {
    super("users");
  }

  async findAllWithRole() {
    try {
      const query = `SELECT users.id, users.name, users.email, users.profile, created_at, role_id, is_active , roles.title AS role
        FROM users
        JOIN roles ON
        users.role_id=roles.id
        `;
      const [results] = await executeQuery(query);

      const result = emptyOrRows(results);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async findOneByIdWithRole(id) {
    try {
      const query = `SELECT users.id, users.name, users.email, users.profile, created_at, role_id, is_active , roles.title AS role
        FROM users
        JOIN roles ON
        users.role_id=roles.id
        WHERE users.id=?
        `;
      const [results] = await executeQuery(query, [id]);

      const result = emptyOrRows(results);
      return result[0];
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = UserService;
