const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

 const attributes = [
   `codigo_bien_natural`,
   `fotografia`,
 ];
 const neededAttributes = [
   `codigo_bien_natural`,
   `fotografia`,
 ];

const updateFotografiasBienesNaturales = async (params, onError = () => {}) => {
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

  let QUERY = `UPDATE fotografias_bienes_naturales SET ${values} WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `UPDATE fotografias_bienes_naturales SET ${values} WHERE codigo_bien_natural=${value}`;
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

module.exports = updateFotografiasBienesNaturales;
