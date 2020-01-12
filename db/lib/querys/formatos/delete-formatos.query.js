const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');

const deleteFormatos = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    condition,
    value,
  } = params;

  let QUERY = `DELETE FROM formatos WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `DELETE FROM formatos WHERE numero_formato=${value}`;
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

module.exports = deleteFormatos;
