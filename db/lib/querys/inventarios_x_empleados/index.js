const createInventariosxEmpleados = require('./create-inventarios_x_empleados.query');
const updateInventariosxEmpleados = require('./update-inventarios_x_empleados.query');
const readInventariosxEmpleados = require('./read-inventarios_x_empleados.query');
const deleteInventariosxEmpleados = require('./delete-inventarios_x_empleados.query');

module.exports = {
  createInventariosxEmpleados,
  updateInventariosxEmpleados,
  readInventariosxEmpleados,
  deleteInventariosxEmpleados,
};
