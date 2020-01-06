require('dotenv').config();

const { DB_NAME } = process.env;

const dbName = DB_NAME || 'proyectobd1';

// TODO: open sql file and run it
//       or just write setup scripts here?

module.exports = [
  {
    description: 'crear la base de datos',
    query: `CREATE DATABASE IF NOT EXISTS ${dbName}`,
  },
  {
    description: 'usar la base de datos',
    query: `USE ${dbName}`,
  },
];
