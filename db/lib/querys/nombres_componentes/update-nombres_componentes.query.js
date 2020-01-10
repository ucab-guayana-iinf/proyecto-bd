const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

 const attributes = [
   `codigo_componente`,
   `nombre_componente`,
 ];
 const neededAttributes = [
   `codigo_componente`,
   `nombre_componente`,
 ];

const updateNombresComponentes = async (params, onError = () => {}) => {
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

  let QUERY = `UPDATE nombres_componentes SET ${values} WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `UPDATE nombres_componentes SET ${values} WHERE codigo_componente=${value}`;
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

module.exports = updateNombresComponentes;
