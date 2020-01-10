const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  mysqlDatetimeToJS,
} = require('../../../utils');

const readFotogrfiasBienesNaturales = async (onError = () => {}) => {
  const db = await getConnection();
  const QUERY = `SELECT * FROM fotografias_bienes_naturales`;

  try {
    const response = await promisifyQuery(db, QUERY);

    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = readFotogrfiasBienesNaturales;
