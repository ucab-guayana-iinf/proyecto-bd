const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

// `codigo_bien` INT,
// `fecha_caducidad` DATETIME NOT NULL,
// `es_compartido` BOOLEAN NOT NULL DEFAULT false,
// `status` ENUM('EN PROCESO DE REGISTRO', 'VIGENTE', 'VENCIDA', 'DESINCORPORADO') NOT NULL DEFAULT 'EN PROCESO DE REGISTRO',

 const attributes = [
   'codigo_bien',
   'fecha_caducidad',
   'es_compartido',
   'status',
 ];
 const neededAttributes = [
   'fecha_caducidad',
 ];

const updateActivosIntangibles = async (params, onError = () => {}) => {
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

  let QUERY = `UPDATE activos_intangibles SET ${values} WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `UPDATE activos_intangibles SET ${values} WHERE codigo_bien=${value}`;
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

module.exports = updateActivosIntangibles;
