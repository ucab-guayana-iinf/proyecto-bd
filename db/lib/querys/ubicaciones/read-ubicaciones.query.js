const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');

const readUbicaciones = async (onError = () => {}) => {
  const db = await getConnection();
  const QUERY = `SELECT * FROM ubicaciones`;

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = readUbicaciones;
