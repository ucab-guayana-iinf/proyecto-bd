const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');

const deleteSedes = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    condition,
    value,
  } = params;

  let QUERY = `DELETE FROM sedes WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `DELETE FROM sedes WHERE codigo_sede=${value}`;
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

module.exports = deleteSedes;
