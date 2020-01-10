const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  spreadObjKeys,
  spreadObjValues,
  validateInput,
} = require('../../../utils');

// `codigo_bien` INT,
// `ubicacion` VARCHAR(255) NOT NULL,
// `superficie` float NOT NULL,
// `tipo_propiedad` ENUM('PROPIA', 'COMODATO') NOT NULL,
// `status` ENUM('EN PROCESO DE REGISTRO', 'EN CONSTRUCCIÓN', 'HABITADA', 'DESHABITADA', 'DESINCORPORADO') NOT NULL,

const attributes = [
  `codigo_bien`,
  `ubicacion`,
  `superficie`,
  `tipo_propiedad`,
  `status`,
];
const neededAttributes = [
  'codigo_bien',
  'ubicacion',
  'superficie',
  `tipo_propiedad`,
];

const createEdificaciones = async (params, onError = () => {}) => {
  const { data } = params;
  const db = await getConnection();
  const columns = spreadObjKeys(data, attributes);
  const values = spreadObjValues(data, attributes);

  if (!validateInput(data, neededAttributes, onError)) {
    return null;
  }

  const QUERY = `INSERT INTO edificaciones ${columns} VALUES ${values};`;
  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = createEdificaciones;
