const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
} = require('../../../utils');

const neededAttributes = [
  'codigo_componente',
  'codigo_componente_padre'
];

const deleteComponentesxComponentes = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    conditions,
  } = params;

  const conditionsValues = spreadObj(conditions, neededAttributes).replace(',', ' AND');
  QUERY = `DELETE FROM componentes_x_componentes WHERE ${conditionsValues}`;

  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = deleteComponentesxComponentes;
