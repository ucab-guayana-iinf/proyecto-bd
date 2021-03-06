const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');

const readSedes = async (onError = () => {}) => {
  const db = await getConnection();
  const QUERY = `SELECT * FROM sedes`;

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = readSedes;
