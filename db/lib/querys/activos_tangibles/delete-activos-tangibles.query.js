const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');

const deleteActivosTangibles = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    condition,
    value,
  } = params;

  let QUERY = `DELETE FROM activos_tangibles WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `DELETE FROM activos_tangibles WHERE codigo_bien=${value}`;
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

module.exports = deleteActivosTangibles;
