const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const { updateSpread } = require('../../../utils');
const tableName = require('./index');

/*
  params expects:
    [
      'direccion',
      'nombre_ciudad',
    ]
*/

const attributes = [
  'direccion',
  'nombre_ciudad',
];

const updateUbicaciones = async (params) => {
  const db = await getConnection();
  const QUERY = `UPDATE ${tableName} ${spread(attributes)} VALUES ${updateSpread(params)}`;
  const response = await promisifyQuery(db, QUERY);
  return response;
};

module.exports = updateUbicaciones;
