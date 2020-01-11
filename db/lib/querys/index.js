const { createUbicaciones, readUbicaciones, updateUbicaciones, deleteUbicaciones } = require('./ubicaciones');
const { createSedes, readSedes, updateSedes, deleteSedes } = require('./sedes');
const { createUnidades, readUnidades, updateUnidades, deleteUnidades } = require('./unidades');
const { createEmpleados, readEmpleados, updateEmpleados, deleteEmpleados } = require('./empleados');
const { createBienes, readBienes, updateBienes, deleteBienes } = require('./bienes');
const { createActivosTangibles, readActivosTangibles, updateActivosTangibles, deleteActivosTangibles } = require('./activos_tangibles');
const { createFacturasActivosTangibles, readFacturasActivosTangibles, updateFacturasActivosTangibles, deleteFacturasActivosTangibles } = require('./facturas_activos_tangibles');
const { createActivosIntangibles, readActivosIntangibles, updateActivosIntangibles, deleteActivosIntangibles } = require('./activos_intangibles');
const { createBienesNaturales, readBienesNaturales, updateBienesNaturales, deleteBienesNaturales } = require('./bienes_naturales');
const { createFotografiasBienesNaturales, readFotografiasBienesNaturales, updateFotografiasBienesNaturales, deleteFotografiasBienesNaturales } = require('./fotografias_bienes_naturales');
const { createCommponentes, readCommponentes, updateCommponentes, deleteCommponentes } = require('./componentes');
const { createNombresCommponentes, readNombresCommponentes, updateNombresCommponentes, deleteNombresCommponentes } = require('./nombres_componentes');

module.exports = {
  createUbicaciones, readUbicaciones, updateUbicaciones, deleteUbicaciones,
  createSedes, readSedes, updateSedes, deleteSedes,
  createUnidades, readUnidades, updateUnidades, deleteUnidades,
  createEmpleados, readEmpleados, updateEmpleados, deleteEmpleados,
  createBienes, readBienes, updateBienes, deleteBienes,
  createActivosTangibles, readActivosTangibles, updateActivosTangibles, deleteActivosTangibles,
  createFacturasActivosTangibles, readFacturasActivosTangibles, updateFacturasActivosTangibles, deleteFacturasActivosTangibles,
  createActivosIntangibles, readActivosIntangibles, updateActivosIntangibles, deleteActivosIntangibles,
  createBienesNaturales, readBienesNaturales, updateBienesNaturales, deleteBienesNaturales,
  createFotografiasBienesNaturales, readFotografiasBienesNaturales, updateFotografiasBienesNaturales, deleteFotografiasBienesNaturales,
  createCommponentes, readCommponentes, updateCommponentes, deleteCommponentes,
  createNombresCommponentes, readNombresCommponentes, updateNombresCommponentes, deleteNombresCommponentes,
};
