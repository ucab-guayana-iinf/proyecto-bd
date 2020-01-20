const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
} = require('../../../utils');


const neededAttributes = [
  `ci`,
  `codigo_bien`,
];

const deleteHistorialResponsableDeUso = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    conditions,
  } = params;

  const conditionsValues = spreadObj(conditions, neededAttributes).replace(',', ' AND');
  const QUERY = `DELETE FROM historial_responsables_de_uso WHERE ${conditionsValues}`;

  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = deleteHistorialResponsableDeUso;
