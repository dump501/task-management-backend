require("dotenv").config();
const mysql = require("mysql2/promise");
const Logger = require("../src/helpers/Logger");

const dbConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT || 3306,
};

module.exports = dbConfig;
