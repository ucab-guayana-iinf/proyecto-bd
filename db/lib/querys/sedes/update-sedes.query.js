const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

/*
  params expects:
    [
      'descripcion',
      'nombre_ciudad',
    ]
*/

const attributes = [
  'descripcion',
  'codigo_ubicacion',
];

const updateSedes = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    condition,
    value,
    data,
  } = params;

  if (!validateInput(data, attributes, onError)) {
    return null;
  }

  const values = spreadObj(data, attributes);

  let QUERY = `UPDATE sedes SET ${values} WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `UPDATE sedes SET ${values} WHERE codigo_sede=${value}`;
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

module.exports = updateSedes;
