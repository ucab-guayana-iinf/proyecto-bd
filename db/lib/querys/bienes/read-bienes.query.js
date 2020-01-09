const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');

const readBienes = async (onError = () => {}) => {
  const db = await getConnection();
  const QUERY = `SELECT * FROM bienes`;

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = readBienes;
