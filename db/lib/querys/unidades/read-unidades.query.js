const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  mysqlDatetimeToJS,
} = require('../../../utils');

const readUnidades = async (onError = () => {}) => {
  const db = await getConnection();
  const QUERY = `SELECT * FROM unidades`;

  try {
    const response = await promisifyQuery(db, QUERY);

    if (response.fecha_jefe) {
      response.fecha_jefe = mysqlDatetimeToJS(response.fecha_jefe);
    }

    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = readUnidades;
