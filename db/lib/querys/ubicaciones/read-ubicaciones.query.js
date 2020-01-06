const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const tableName = require('./index');

const readUbicaciones = async () => {
  const db = await getConnection();
  const QUERY = `SELECT * FROM ${tableName}`;
  const response = await promisifyQuery(db, QUERY);
  return response;
};

module.exports = readUbicaciones;
