const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

 const attributes = [
   'codigo_bien',
   'numero_factura',
   'status',
 ];
 const neededAttributes = [
   'codigo_bien',
   'numero_factura',
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
    QUERY = `UPDATE activos_tangibles SET ${values} WHERE codigo_bien=${value}`;
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
