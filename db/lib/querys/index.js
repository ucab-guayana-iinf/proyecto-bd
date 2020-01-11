const { createUbicaciones, readUbicaciones, updateUbicaciones, deleteUbicaciones } = require('./ubicaciones');
const { createSede, readSedes, updateSedes, deleteSedes } = require('./sedes');
const { createUnidades, readUnidades, updateUnidades, deleteUnidades } = require('./unidades');
const { createEmpleados, readEmpleados, updateEmpleados, deleteEmpleados } = require('./empleados');
const { createBienes, readBienes, updateBienes, deleteBienes } = require('./bienes');
const { createActivosTangibles, readActivosTangibles, updateActivosTangibles, deleteActivosTangibles } = require('./activos_tangibles');
const { createFacturasActivosTangibles, readFacturasActivosTangibles, updateFacturasActivosTangibles, deleteFacturasActivosTangibles } = require('./facturas_activos_tangibles');
const { createActivosIntangibles, readActivosIntangibles, updateActivosIntangibles, deleteActivosIntangibles } = require('./activos_intangibles');
const { createBienesNaturales, readBienesNaturales, updateBienesNaturales, deleteBienesNaturales } = require('./bienes_naturales');
const { createFotografiasBienesNaturales, readFotografiasBienesNaturales, updateFotografiasBienesNaturales, deleteFotografiasBienesNaturales } = require('./fotografias_bienes_naturales');
const { createComponentes, readComponentes, updateComponentes, deleteComponentes } = require('./componentes');
const { createNombresComponentes, readNombresComponentes, updateNombresComponentes, deleteNombresComponentes } = require('./nombres_componentes');
const { createEdificaciones, readEdificaciones, updateEdificaciones, deleteEdificaciones } = require('./edificaciones');
const { createComponentesxComponentes, readComponentesxComponentes, updateComponentesxComponentes, deleteComponentesxComponentes } = require('./componentes_x_componentes');
const { createFormatos, readFormatos, updateFormatos, deleteFormatos } = require('./formatos');

module.exports = {
  createUbicaciones, readUbicaciones, updateUbicaciones, deleteUbicaciones,
  createSede, readSedes, updateSedes, deleteSedes,
  createUnidades, readUnidades, updateUnidades, deleteUnidades,
  createEmpleados, readEmpleados, updateEmpleados, deleteEmpleados,
  createBienes, readBienes, updateBienes, deleteBienes,
  createActivosTangibles, readActivosTangibles, updateActivosTangibles, deleteActivosTangibles,
  createFacturasActivosTangibles, readFacturasActivosTangibles, updateFacturasActivosTangibles, deleteFacturasActivosTangibles,
  createActivosIntangibles, readActivosIntangibles, updateActivosIntangibles, deleteActivosIntangibles,
  createBienesNaturales, readBienesNaturales, updateBienesNaturales, deleteBienesNaturales,
  createFotografiasBienesNaturales, readFotografiasBienesNaturales, updateFotografiasBienesNaturales, deleteFotografiasBienesNaturales,
  createComponentes, readComponentes, updateComponentes, deleteComponentes,
  createNombresComponentes, readNombresComponentes, updateNombresComponentes, deleteNombresComponentes,
  createEdificaciones, readEdificaciones, updateEdificaciones, deleteEdificaciones,
  createComponentesxComponentes, readComponentesxComponentes, updateComponentesxComponentes, deleteComponentesxComponentes,
  createFormatos, readFormatos, updateFormatos, deleteFormatos,
};
