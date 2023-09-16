const { executeQuery, emptyOrRows } = require("./DatabaseService");
const Service = require("./Service");

class TaskSercice extends Service {
  constructor() {
    super("tasks");
  }

  async findAllWithRelations() {
    try {
      const query = `SELECT tasks.*, 
            created_by.email AS created_by_email, created_by.id AS created_by_id, created_by.name AS created_by_name, created_by.profile AS created_by_profile,
            assigned_by.email AS assigned_by_email, assigned_by.id AS assigned_by_id, assigned_by.name AS assigned_by_name, assigned_by.profile AS assigned_by_profile,
            assigned_to.email AS assigned_to_email, assigned_to.id AS assigned_to_id, assigned_to.name AS assigned_to_name, assigned_to.profile AS assigned_to_profile
            FROM tasks
            JOIN users created_by ON 
            tasks.created_by =created_by.id
            JOIN users assigned_by ON
            tasks.assigned_by=assigned_by.id
            JOIN users assigned_to ON
            tasks.assigned_to=assigned_to.id
            `;
      const [results] = await executeQuery(query);

      const result = emptyOrRows(results);

      // format result
      const jsonResult = {};

      for (const row of result) {
        const id = row.id;

        if (!jsonResult[id]) {
          jsonResult[id] = {
            id: row.id,
            title: row.title,
            description: row.description,
            current_status: row.current_status,
            deadline: row.deadline,
            tag: row.tag,
            assigned_date: row.assigned_date,
            createdBy: {},
            assignedBy: {},
            assignedTo: {},
            created_at: row.created_at,
          };
        }

        jsonResult[id].createdBy = {
          id: row.created_by_id,
          name: row.created_by_name,
          profile: row.created_by_profile,
          email: row.created_by_email,
        };

        jsonResult[id].assignedBy = {
          id: row.assigned_by_id,
          name: row.assigned_by_name,
          profile: row.assigned_by_profile,
          email: row.assigned_by_email,
        };

        jsonResult[id].assignedTo = {
          id: row.assigned_to_id,
          name: row.assigned_to_name,
          profile: row.assigned_to_profile,
          email: row.assigned_to_email,
        };
      }

      const finalResult = Object.values(jsonResult);

      return finalResult;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = TaskSercice;
