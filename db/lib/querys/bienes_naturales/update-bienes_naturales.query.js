const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

 const attributes = [
   `codigo_bien`,
   `nombre_cientifico`,
   `nombre_vulgar`,
   `es_frutal`,
   `periodo_floral`,
   `origen`,
   `ubicacion`,
   `status`,
 ];
 const neededAttributes = [
   'codigo_bien',
   `nombre_cientifico`,
   `nombre_vulgar`,
   `periodo_floral`,
   `origen`,
   `ubicacion`,
 ];

const updateBienesNaturales = async (params, onError = () => {}) => {
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

  let QUERY = `UPDATE edificaciones SET ${values} WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `UPDATE edificaciones SET ${values} WHERE codigo_bien=${value}`;
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

module.exports = updateBienesNaturales;
