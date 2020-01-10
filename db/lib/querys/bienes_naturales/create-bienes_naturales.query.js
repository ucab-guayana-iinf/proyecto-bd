const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  spreadObjKeys,
  spreadObjValues,
  validateInput,
} = require('../../../utils');

const attributes = [
  `codigo_bien`,
  `nombre_cientifico`,
  `nombre_vulgar`,
  `es_frutal`,
  `periodo_floral`,
  `origen`,
  `ubicacion`,
  `status`,
];
const neededAttributes = [
  'codigo_bien',
  `nombre_cientifico`,
  `nombre_vulgar`,
  `periodo_floral`,
  `origen`,
  `ubicacion`,
];

const createBienesNaturales = async (params, onError = () => {}) => {
  const { data } = params;
  const db = await getConnection();
  const columns = spreadObjKeys(data, attributes);
  const values = spreadObjValues(data, attributes);

  if (!validateInput(data, neededAttributes, onError)) {
    return null;
  }

  const QUERY = `INSERT INTO bienes_naturales ${columns} VALUES ${values};`;
  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = createBienesNaturales;
