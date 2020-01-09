require('dotenv').config();

const setupDatabase = require('./setupDatabase');
const promisifyQuery = require('./promisifyQuery');
const getConnection = require('./getConnection');

const { DB_NAME } = process.env;

const dbName = DB_NAME || 'proyectobd1';

const restartDatabase = async () => {
  const connection =   await setupDatabase(false);
  console.log('restarting the database');
  await promisifyQuery(connection, `DROP DATABASE ${dbName}`);
  console.log('database restarted');
};

module.exports = restartDatabase;
