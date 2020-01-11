const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

 const attributes = [
  `numero_formato`,
  `codigo_unidad_emisora`,
  `codigo_unidad_receptora`,
  `ficha_responsable_cedente`,
  `ficha_responsable_receptor`,
  `aprobacion_emisor`,
  `aprobacion_receptor`,
  `fecha_formato`,
];
const neededAttributes = [
  `numero_formato`,
  `codigo_unidad_emisora`,
  `codigo_unidad_receptora`,
  `ficha_responsable_cedente`,
  `ficha_responsable_receptor`,
  `fecha_formato`,
];

const updateFormatos = async (params, onError = () => {}) => {
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

  let QUERY = `UPDATE formatos SET ${values} WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `UPDATE formatos SET ${values} WHERE numero_formato=${value}`;
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

module.exports = updateFormatos;
