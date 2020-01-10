const createEdificaciones = require('./create-edificaciones.query');
const updateEdificaciones = require('./update-edificaciones.query');
const readEdificaciones = require('./read-edificaciones.query');
const deleteEdificaciones = require('./delete-edificaciones.query');

module.exports = {
  createEdificaciones,
  updateEdificaciones,
  readEdificaciones,
  deleteEdificaciones,
};
