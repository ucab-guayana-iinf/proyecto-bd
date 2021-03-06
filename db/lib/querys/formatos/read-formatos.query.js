const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  mysqlDatetimeToJS,
} = require('../../../utils');

const readFormatos = async (onError = () => {}) => {
  const db = await getConnection();
  const QUERY = `SELECT * FROM formatos`;

  try {
    const response = await promisifyQuery(db, QUERY);
    if (response.fecha_formato) {
      response.fecha_formato = mysqlDatetimeToJS(response.fecha_formato);
    }
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = readFormatos;
