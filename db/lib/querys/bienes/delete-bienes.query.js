const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');

const deleteBienes = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    condition,
    value,
  } = params;

  let QUERY = `DELETE FROM bienes WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `DELETE FROM bienes WHERE codigo_bien=${value}`;
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

module.exports = deleteBienes;
