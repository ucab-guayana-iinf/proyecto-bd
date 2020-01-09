const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  mysqlDatetimeToJS,
} = require('../../../utils');

const readBienes = async (onError = () => {}) => {
  const db = await getConnection();
  const QUERY = `SELECT * FROM bienes`;

  try {
    const response = await promisifyQuery(db, QUERY);

    if (response.fecha_incorporacion) {
      response.fecha_incorporacion = mysqlDatetimeToJS(response.fecha_incorporacion);
    }

    if (response.fecha_desincorporacion) {
      response.fecha_desincorporacion = mysqlDatetimeToJS(response.fecha_desincorporacion);
    }

    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = readBienes;
