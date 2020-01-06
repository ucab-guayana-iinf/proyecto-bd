const tableName = require('./index');
const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');

// params expects:
// {
//   condition: string
//   value: string|number
// }

// table ubicaciones:
//   `codigo_ubicacion` INT NOT NULL AUTO_INCREMENT.
//   `direccion` VARCHAR(255) UNIQUE NOT NULL,
//   `nombre_ciudad` VARCHAR(255),

// example
/*
  borra todas las ubicaciones que empiezen con la dirección "puerto ordaz"

  deleteUbicaciones(db, {
    value: 'puerto ordaz'
    condition: 'direccion^='
  });
*/

const deleteUbicaciones = async (params) => {
  const db = await getConnection();

  const {
    condition,
    value,
  } = params;

  let QUERY = `DELETE FROM ${tableName} WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `DELETE FROM ${tableName} WHERE codigo_ubicacion=${value}`;
  }

  const response = await promisifyQuery(db, QUERY);
  return response;
};

module.exports = deleteUbicaciones;
