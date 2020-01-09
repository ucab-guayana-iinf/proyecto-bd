const { createUbicaciones, readUbicaciones, updateUbicaciones, deleteUbicaciones } = require('./ubicaciones');
const { createSede, readSedes, updateSedes, deleteSedes } = require('./sedes');
const { createUnidades, readUnidades, updateUnidades, deleteUnidades } = require('./unidades');
const { createEmpleados, readEmpleados, updateEmpleados, deleteEmpleados } = require('./empleados');
const { createBienes, readBienes, updateBienes, deleteBienes } = require('./bienes');
const { createActivosTangibles, readActivosTangibles, updateActivosTangibles, deleteActivosTangibles } = require('./activos_tangibles');
const { createFacturasActivosTangibles, readFacturasActivosTangibles, updateFacturasActivosTangibles, deleteFacturasActivosTangibles } = require('./facturas_activos_tangibles');

module.exports = {
  createUbicaciones, readUbicaciones, updateUbicaciones, deleteUbicaciones,
  createSede, readSedes, updateSedes, deleteSedes,
  createUnidades, readUnidades, updateUnidades, deleteUnidades,
  createEmpleados, readEmpleados, updateEmpleados, deleteEmpleados,
  createBienes, readBienes, updateBienes, deleteBienes,
  createActivosTangibles, readActivosTangibles, updateActivosTangibles, deleteActivosTangibles,
  createFacturasActivosTangibles, readFacturasActivosTangibles, updateFacturasActivosTangibles, deleteFacturasActivosTangibles,
};
