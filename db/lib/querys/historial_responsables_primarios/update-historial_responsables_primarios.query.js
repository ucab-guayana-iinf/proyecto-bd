const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

 const attributes = [
  `ci`,
  `codigo_unidad`,
];
const neededAttributes = [
  `ci`,
  `codigo_unidad`,
];

const updateHistorialResponsablesPrimarios = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    conditions,
    data,
  } = params;

  if (!validateInput(data, neededAttributes, onError)) {
    return null;
  }

  const values = spreadObj(data, attributes);

  const conditionsValues = spreadObj(conditions).replace(',', 'AND');
  QUERY = `UPDATE historial_responsables_primarios SET ${values} WHERE ${conditionsValues}`;

  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = updateHistorialResponsablesPrimarios;
