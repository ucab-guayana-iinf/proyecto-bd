const promisifyQuery = require('../../promisifyQuery');
const getConnection = require('../../getConnection');
const {
  mysqlDatetimeToJS,
} = require('../../../utils');

const readHistorialResponsableDeUso = async (onError = () => {}) => {
  const db = await getConnection();
  const QUERY = `SELECT * FROM historial_responsable_de_uso`;

  try {
    const response = await promisifyQuery(db, QUERY);

    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = readHistorialResponsableDeUso;
