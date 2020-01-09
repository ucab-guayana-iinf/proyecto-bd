const tableName = 'unidades';

const createEmpleados = require('./create-empleados.query');
const updateEmpleados = require('./update-empleados.query');
const readEmpleados = require('./read-empleados.query');
const deleteEmpleados = require('./delete-empleados.query');

module.exports = {
  tableName,
  createEmpleados,
  updateEmpleados,
  readEmpleados,
  deleteEmpleados,
};
