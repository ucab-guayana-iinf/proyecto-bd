const createEmpleados = require('./create-empleados.query');
const updateEmpleados = require('./update-empleados.query');
const readEmpleados = require('./read-empleados.query');
const deleteEmpleados = require('./delete-empleados.query');

module.exports = {
  createEmpleados,
  updateEmpleados,
  readEmpleados,
  deleteEmpleados,
};
