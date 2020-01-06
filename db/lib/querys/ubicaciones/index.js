const tableName = 'ubicaciones';

const createUbicaciones = require('./create-ubicaciones.query');
const updateUbicaciones = require('./update-ubicaciones.query');
const readUbicaciones = require('./read-ubicaciones.query');
const deleteUbicaciones = require('./delete-ubicaciones.query');

module.exports = {
  tableName,
  createUbicaciones,
  updateUbicaciones,
  readUbicaciones,
  deleteUbicaciones,
};
