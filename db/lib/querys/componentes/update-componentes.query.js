const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

 const attributes = [
   `codigo_bien`,
   `codigo_componente`,
   `nombre_componente`,
 ];
 const neededAttributes = [
   `codigo_bien`,
   `codigo_componente`
 ];

const updateComponentes = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    conditions,
    data,
  } = params;

  if (!validateInput(data, neededAttributes, onError)) {
    return null;
  }

  const values = spreadObj(data, neededAttributes);

  const conditionsValues = spreadObj(conditions, neededAttributes).replace(',', ' AND');
  QUERY = `UPDATE componentes SET ${values} WHERE ${conditionsValues}`;

  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = updateComponentes;
