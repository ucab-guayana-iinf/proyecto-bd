const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  mysqlDatetimeToJS,
} = require('../../../utils');

const readNombresComponentes = async (onError = () => {}) => {
  const db = await getConnection();
  const QUERY = `SELECT * FROM nombres_componentes`;

  try {
    const response = await promisifyQuery(db, QUERY);

    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = readNombresComponentes;
