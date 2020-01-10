const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');

const deleteNombres_Componentes = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    condition,
    value,
  } = params;

  let QUERY = `DELETE FROM nombres_componentes WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `DELETE FROM nombres_componentes WHERE codigo_componente=${value}`;
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

module.exports = deleteNombres_Componentes;
