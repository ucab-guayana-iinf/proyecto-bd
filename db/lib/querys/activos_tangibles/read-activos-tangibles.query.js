const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  mysqlDatetimeToJS,
} = require('../../../utils');

const readActivosTangibles = async (onError = () => {}) => {
  const db = await getConnection();
  const QUERY = `SELECT * FROM activos_tangibles`;

  try {
    const response = await promisifyQuery(db, QUERY);

    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = readActivosTangibles;
