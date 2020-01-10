const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
} = require('../../../utils');

/*
  conditions: {
    'codigo_bien': 1,
    'codigo_componente': 2,
  }
*/

const deleteComponentes = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    conditions,
    condition,
    value,
  } = params;

  let QUERY = `DELETE FROM componentes WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `DELETE FROM componentes WHERE codigo_bien=${value}`;
  }

  if (conditions) {
    const conditionsValues = spreadObj(conditions).replace(',', 'AND');
    QUERY = `DELETE FROM componentes WHERE ${conditionsValues}`;
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

module.exports = deleteComponentes;
