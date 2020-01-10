const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');

const readEmpleados = async (onError = () => {}) => {
  const db = await getConnection();
  const QUERY = `SELECT * FROM empleados`;

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = readEmpleados;
