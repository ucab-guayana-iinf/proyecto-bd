const createInventarios = require('./create-inventarios.query');
const updateInventarios = require('./update-inventarios.query');
const readInventarios = require('./read-inventarios.query');
const deleteInventarios = require('./delete-inventarios.query');

module.exports = {
  createInventarios,
  updateInventarios,
  readInventarios,
  deleteInventarios,
};
