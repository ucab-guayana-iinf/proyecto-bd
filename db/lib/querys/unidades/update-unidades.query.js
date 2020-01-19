const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

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

const updateUnidades = async (params, onError = () => {}) => {
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

  let QUERY = `UPDATE unidades SET ${values} WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `UPDATE unidades SET ${values} WHERE codigo_unidad=${value}`;
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

module.exports = updateUnidades;
