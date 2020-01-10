const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');

const deleteEmpleados = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    condition,
    value,
  } = params;

  let QUERY = `DELETE FROM empleados WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `DELETE FROM empleados WHERE ci=${value}`;
  }
  
  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = deleteEmpleados;
