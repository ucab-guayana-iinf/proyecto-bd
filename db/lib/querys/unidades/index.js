const tableName = 'unidades';

const createUnidades = require('./create-unidades.query');
const updateUnidades = require('./update-unidades.query');
const readUnidades = require('./read-unidades.query');
const deleteUnidades = require('./delete-unidades.query');

module.exports = {
  tableName,
  createUnidades,
  updateUnidades,
  readUnidades,
  deleteUnidades,
};
