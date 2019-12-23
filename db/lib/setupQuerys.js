require('dotenv').config();

const { DB_NAME } = process.env;

const dbName = DB_NAME || 'proyectobd1';

// TODO: open sql file and run it

module.exports = [
  {
    description: 'crear la base de datos',
    query: `CREATE DATABASE IF NOT EXISTS ${dbName};`
  }
];
