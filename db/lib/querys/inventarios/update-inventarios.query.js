const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

 const attributes = [
  `anio`,
  `semestre`,
  `fecha_inicio`,
  `fecha_fin`,
  `status`,
  `ci_lider_inventario`,
];
const neededAttributes = [
  `anio`,
  `semestre`,
  `fecha_inicio`,
  `fecha_fin`,
  `status`,
];

const updateInventarios = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    conditions,
    data,
  } = params;

  if (!validateInput(data, neededAttributes, onError)) {
    return null;
  }

  const values = spreadObj(data, attributes);

  const conditionsValues = spreadObj(conditions, neededAttributes).replace(',', ' AND');
  QUERY = `UPDATE inventarios SET ${values} WHERE ${conditionsValues}`;

  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = updateInventarios;
