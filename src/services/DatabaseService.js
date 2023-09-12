const mysql = require("mysql2/promise")
const dbConfig = require("../../config/database.config")

async function executeQuery(sql, params){
    const connection = await mysql.createConnection(dbConfig)
    return await connection.execute(sql, params)
}

function emptyOrRows(rows){
    if(!rows){
        return []
    }
    return rows;
}

module.exports = {
    executeQuery,
    emptyOrRows
}