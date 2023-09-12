const { log } = require("../helpers/Logger")
const { executeQuery, emptyOrRows } = require("./DatabaseService")

class Service {
    constructor(tableName) {
        this.tableName = tableName
    }

    async findAll() {
        try {

            const query = `SELECT * FROM ${this.tableName}`
            const [results,] = await executeQuery(query)
            return emptyOrRows(results)
        } catch (error) {
            console.error(error);
        }
    }

    async findOneById(id) {
        try {

            const query = `SELECT * FROM ${this.tableName} WHERE id= ?`
            const [result,] = await executeQuery(query, [id])
            return result[0];
        } catch (error) {
            console.error(error);
        }
    }

    async findOneByfield(field, value) {
        try {

            const query = `SELECT * FROM ${this.tableName} WHERE ${field}= ?`
            const [result,] = await executeQuery(query, [value])
            return result[0];
        } catch (error) {
            console.error(error);
        }
    }

    async findByfield(field, value) {
        try {

            const query = `SELECT * FROM ${this.tableName} WHERE ${field}= ?`
            const [result,] = await executeQuery(query, [value])
            return emptyOrRows(result);
        } catch (error) {
            console.error(error);
        }
    }

    async save(data) {
        try {
            const attributes = Object.keys(data);
            const values = attributes.map(attribute => `${data[attribute]}`);
            const query = `INSERT INTO ${this.tableName} (${attributes.join(', ')}) VALUES (${attributes.map(() => "?").join(", ")})`
            const [result,] = await executeQuery(query, values)
            return result.insertId
        } catch (error) {
            console.error(error);
        }
    }

    async update(id, data) {
        try {

            const query = `UPDATE ${this.tableName} SET ? WHERE id= ?`
            const [result,] = await executeQuery(query, [data, id])
            return result.affectedRows
        } catch (error) {
            console.error(error);
        }
    }

    async delete(id) {
        try {

            const query = `DELETE FROM ${this.tableName} WHERE id = ?`
            const [result,] = await executeQuery(query, [id])
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Service