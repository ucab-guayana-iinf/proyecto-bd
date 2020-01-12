const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
} = require('../../../utils');


const deleteInventariosxSedes = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    conditions,
  } = params;

  const conditionsValues = spreadObj(conditions).replace(',', 'AND');
  QUERY = `DELETE FROM inventarios_x_sedes WHERE ${conditionsValues}`;

  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = deleteInventariosxSedes;
