const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  spreadObjKeys,
  spreadObjValues,
} = require('../../../utils');

// params expects:
// {
//   descripcion: string
//   direccion: id
// }
const attributes = [
  'direccion',
  'nombre_ciudad',
];

const createUbicaciones = async (params, onError = () => {}) => {
  const { data } = params;
  const db = await getConnection();
  const columns = spreadObjKeys(data, attributes);
  const values = spreadObjValues(data, attributes);
  const QUERY = `INSERT INTO ubicaciones ${columns} VALUES ${values};`;
  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = createUbicaciones;
