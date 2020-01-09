const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  spreadObjKeys,
  spreadObjValues,
  validateInput,
} = require('../../../utils');

// `ci` INT,
// `nombre_completo` VARCHAR(255),
// `codigo_unidad` INT,

const attributes = [
  'ci',
  'nombre_completo',
  'codigo_unidad',
];
const neededAttributes = attributes;

const createEmpleados = async (params, onError = () => {}) => {
  const { data } = params;
  const db = await getConnection();
  const columns = spreadObjKeys(data, attributes);
  const values = spreadObjValues(data, attributes);

  if (!validateInput(data, neededAttributes, onError)) {
    return null;
  }

  const QUERY = `INSERT INTO empleados ${columns} VALUES ${values};`;
  console.log(QUERY);
  
  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = createEmpleados;
