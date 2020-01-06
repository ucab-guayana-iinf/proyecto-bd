const promisifyQuery = require('../../promisifyQuery');
const spread = require('../../../utils');
const getConnection = require('../../getConnection');
const tableName = require('./index');

// params expects:
// {
//   description: string
//   direccion: id
// }

const attributes = [
  'descripcion',
  'direccion',
];

const createUbicaciones = async (params) => {
  const db = await getConnection();
  const QUERY = `INSERT INTO ${tableName} ${spread(attributes)} VALUES ${spread(params)}`;
  const response = await promisifyQuery(db, QUERY);
  return response;
};

module.exports = createUbicaciones;
