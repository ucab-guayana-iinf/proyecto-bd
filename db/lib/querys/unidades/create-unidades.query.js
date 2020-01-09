const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  spreadObjKeys,
  spreadObjValues,
  validateInput,
} = require('../../../utils');

// params expects:
// {
//   'codigo_sede', // int
//   'nombre_unidad', // string
//   'fecha_jefe', // mysql datetime
//   'ci_jefe' // int
// }

const attributes = [
  'codigo_sede', // int
  'nombre_unidad', // string
  'fecha_jefe', // mysql datetime
  'ci_jefe' // int
];
const neededAttributes = [
  'codigo_sede',
  'nombre_unidad',
];

const createUnidades = async (params, onError = () => {}) => {
  const { data } = params;
  const db = await getConnection();

  const columns = spreadObjKeys(data, attributes);
  const values = spreadObjValues(data, attributes);

  if (!validateInput(data, neededAttributes, onError)) {
    return null;
  }

  const QUERY = `INSERT INTO unidades ${columns} VALUES ${values};`;

  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = createUnidades;
