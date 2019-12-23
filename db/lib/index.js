const mysql = require('mysql');
require('dotenv').config();

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
} = process.env;

const db = mysql.createConnection({
  database: DB_NAME || 'proyectobd1',
  host: DB_HOST || 'localhost',
  user: DB_USER || 'root',
  password: DB_PASSWORD || 'root',
  multipleStatements: true,
});
db.connect();
console.log('Connection to DB stablished')

module.exports = { db };
