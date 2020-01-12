const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  mysqlDatetimeToJS,
} = require('../../../utils');

const readInventariosxBienes = async (onError = () => {}) => {
  const db = await getConnection();
  const QUERY = `SELECT * FROM inventarios_x_bienes`;

  try {
    const response = await promisifyQuery(db, QUERY);

    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = readInventariosxBienes;
