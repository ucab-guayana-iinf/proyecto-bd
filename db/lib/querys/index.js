const { createUbicaciones, readUbicaciones, updateUbicaciones, deleteUbicaciones } = require('./ubicaciones');
const { createSedes, readSedes, updateSedes, deleteSedes } = require('./sedes');
const { createUnidades, readUnidades, updateUnidades, deleteUnidades } = require('./unidades');
const { createEmpleados, readEmpleados, updateEmpleados, deleteEmpleados } = require('./empleados');
const { createBienes, readBienes, updateBienes, deleteBienes } = require('./bienes');
const { createActivosTangibles, readActivosTangibles, updateActivosTangibles, deleteActivosTangibles } = require('./activos_tangibles');
const { createActivosIntangibles, readActivosIntangibles, updateActivosIntangibles, deleteActivosIntangibles } = require('./activos_intangibles');

module.exports = {
  createUbicaciones, readUbicaciones, updateUbicaciones, deleteUbicaciones,
  createSedes, readSedes, updateSedes, deleteSedes,
  createUnidades, readUnidades, updateUnidades, deleteUnidades,
  createEmpleados, readEmpleados, updateEmpleados, deleteEmpleados,
  createBienes, readBienes, updateBienes, deleteBienes,
  createActivosTangibles, readActivosTangibles, updateActivosTangibles, deleteActivosTangibles,
  createActivosIntangibles, readActivosIntangibles, updateActivosIntangibles, deleteActivosIntangibles,
};
