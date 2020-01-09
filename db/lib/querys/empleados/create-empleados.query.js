const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  spreadObjKeys,
  spreadObjValues,
  validateInput,
} = require('../../../utils');

const createEmpleados = async (params, onError = () => {}) => {
  // const { data } = params;
  // const db = await getConnection();
  // const columns = spreadObjKeys(data, attributes);
  // const values = spreadObjValues(data, attributes);
  //
  // if (!validateInput(data, attributes, onError)) {
  //   return null;
  // }
  //
  // const QUERY = `INSERT INTO empleados ${columns} VALUES ${values};`;
  // console.log(QUERY);
  //
  // try {
  //   const response = await promisifyQuery(db, QUERY);
  //   return response;
  // } catch (error) {
  //   onError(error.message);
  //   return null;
  // }
};

module.exports = createEmpleados;
