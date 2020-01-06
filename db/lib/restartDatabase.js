require('dotenv').config();

const setupDatabase = require('./setupDatabase');
const promisifyQuery = require('./promisifyQuery');
const getConnection = require('./getConnection');

const { DB_NAME } = process.env;

const dbName = DB_NAME || 'proyectobd1';

const restartDatabase = async () => {
  const db = await getConnection();
  console.log('restarting the database');
  await promisifyQuery(db, `DROP DATABASE ${dbName}`);
  await setupDatabase(db);
  console.log('database restarted');
};

module.exports = restartDatabase;
