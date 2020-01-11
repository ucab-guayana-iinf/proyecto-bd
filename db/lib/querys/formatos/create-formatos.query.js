const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  spreadObjKeys,
  spreadObjValues,
  validateInput,
} = require('../../../utils');

// `codigo_bien` INT,
// `descripcion` VARCHAR(255),
// `fecha_incorporacion` DATETIME,
// `fecha_desincorporacion` DATETIME,
// `origen` VARCHAR(255),
// `codigo_unidad` INT,
// `tipo` VARCHAR(255),

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

const createFormatos = async (params, onError = () => {}) => {
  const { data } = params;
  const db = await getConnection();
  const columns = spreadObjKeys(data, attributes);
  const values = spreadObjValues(data, attributes);

  if (!validateInput(data, neededAttributes, onError)) {
    return null;
  }

  const QUERY = `INSERT INTO formatos ${columns} VALUES ${values};`;
  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = createFormatos;
