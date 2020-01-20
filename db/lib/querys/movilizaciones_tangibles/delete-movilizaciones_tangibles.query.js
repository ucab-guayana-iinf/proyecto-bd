const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
} = require('../../../utils');

const neededAttributes = [
  `numero_formato`,
  `codigo_bien_tangible`,
];

const deleteMovilizacionesTangibles = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    conditions,
  } = params;

  const conditionsValues = spreadObj(conditions, neededAttributes).replace(',', ' AND');
  QUERY = `DELETE FROM movilizaciones_tangibles WHERE ${conditionsValues}`;

  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = deleteMovilizacionesTangibles;
