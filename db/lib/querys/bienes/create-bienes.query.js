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
  'codigo_bien',
  'descripcion',
  'fecha_incorporacion',
  'fecha_desincorporacion',
  'origen',
  'codigo_unidad',
  'tipo',
];
const neededAttributes = [
  'descripcion',
  'codigo_unidad',
];

const createBienes = async (params, onError = () => {}) => {
  const { data } = params;
  const db = await getConnection();
  const columns = spreadObjKeys(data, attributes);
  const values = spreadObjValues(data, attributes);

  if (!validateInput(data, neededAttributes, onError)) {
    return null;
  }

  const QUERY = `INSERT INTO bienes ${columns} VALUES ${values};`;
  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = createBienes;
