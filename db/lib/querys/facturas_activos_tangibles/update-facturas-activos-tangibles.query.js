const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

 const attributes = [
   'numero_factura',
   'numero_orden',
   'proveedor',
   'precio_compra',
   'plazo_garantia'
 ];
 const neededAttributes = [
   'numero_factura',
   'proveedor',
   'precio_compra',
 ];

const updateFacturasActivosTangibles = async (params, onError = () => {}) => {
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

  let QUERY = `UPDATE facturas_activos_tangibles SET ${values} WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `UPDATE facturas_activos_tangibles SET ${values} WHERE numero_factura=${value}`;
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

module.exports = updateFacturasActivosTangibles;
