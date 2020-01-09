const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

 // `numero_orden` INT,

 const attributes = [
   'numero_orden',
 ];
 const neededAttributes = [
   'numero_orden',
 ];

const updateActivosTangibles = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    condition,
    value,
    data,
  } = params;

  if (!validateInput(data, neededAttributes, onError)) {
    return null;
  }

  const values = spreadObj(data, attributes);

  let QUERY = `UPDATE activos_tangibles SET ${values} WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `UPDATE activos_tangibles SET ${values} WHERE numero_factura=${value}`;
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

module.exports = updateActivosTangibles;
