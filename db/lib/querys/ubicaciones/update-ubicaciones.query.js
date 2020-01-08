const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
 } = require('../../../utils');

/*
  params expects:
    [
      'direccion',
      'nombre_ciudad',
    ]
*/

const attributes = [
  'direccion',
  'nombre_ciudad',
];

const updateUbicaciones = async (params) => {
  const db = await getConnection();

  const {
    condition,
    value,
  } = params;

  const values = spreadObj(params, attributes);

  let QUERY = `UPDATE ubicaciones SET ${values} WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `UPDATE ubicaciones SET ${values} WHERE codigo_ubicacion=${value}`;
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

module.exports = updateUbicaciones;
