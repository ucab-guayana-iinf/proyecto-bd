const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

 const attributes = [
  `codigo_componente`,
  `codigo_componente_padre`,
];
const neededAttributes = [
  `codigo_componente`,
  `codigo_componente_padre`,
];

const updateComponentesxComponentes = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    conditions,
    data,
  } = params;

  if (!validateInput(data, neededAttributes, onError)) {
    return null;
  }

  const values = spreadObj(data, attributes);

  const conditionsValues = spreadObj(conditions, attributes).replace(',', ' AND');
  QUERY = `UPDATE componentes_x_componentes SET ${values} WHERE ${conditionsValues}`;

  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = updateComponentesxComponentes;
