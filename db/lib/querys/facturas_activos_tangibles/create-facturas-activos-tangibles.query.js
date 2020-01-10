const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  spreadObjKeys,
  spreadObjValues,
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

const createFacturasActivosTangibles = async (params, onError = () => {}) => {
  const { data } = params;
  const db = await getConnection();
  const columns = spreadObjKeys(data, attributes);
  const values = spreadObjValues(data, attributes);

  if (!validateInput(data, neededAttributes, onError)) {
    return null;
  }

  const QUERY = `INSERT INTO facturas_activos_tangibles ${columns} VALUES ${values};`;
  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = createFacturasActivosTangibles;
