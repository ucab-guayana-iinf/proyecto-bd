const mysql = require('mysql');
require('dotenv').config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
} = process.env;

const db = mysql.createConnection({
  host: DB_HOST || 'localhost',
  user: DB_USER || 'root',
  password: DB_PASSWORD || 'root',
  multipleStatements: true,
});

module.exports = db;
