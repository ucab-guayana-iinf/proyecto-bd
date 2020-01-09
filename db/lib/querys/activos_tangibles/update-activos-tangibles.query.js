const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

 // `codigo_bien` INT,
 // `proveedor` VARCHAR(255) NOT NULL,
 // `numero_factura` INT UNIQUE NOT NULL,
 // `precio` float NOT NULL,
 // `plazo_garantia` INT,
 // `status` ENUM('EN PROCESO DE REGISTRO', 'ACTIVO', 'DAÑADO', 'OBSOLETO', 'EN PREPARACIÓN', 'DESINCORPORADO') NOT NULL,

 const attributes = [
   'proveedor',
   'numero_factura',
   'precio',
   'plazo_garantia',
   'status',
 ];
 const neededAttributes = [
   'proveedor',
   'numero_factura',
   'precio',
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
