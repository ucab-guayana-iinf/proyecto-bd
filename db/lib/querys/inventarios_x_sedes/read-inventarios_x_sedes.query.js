const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  mysqlDatetimeToJS,
} = require('../../../utils');

const readInventariosxSedes = async (onError = () => {}) => {
  const db = await getConnection();
  const QUERY = `SELECT * FROM inventarios_x_sedes`;

  try {
    const response = await promisifyQuery(db, QUERY);

    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = readInventariosxSedes;
