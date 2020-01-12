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
const { createEdificaciones, readEdificaciones, updateEdificaciones, deleteEdificaciones } = require('./edificaciones');
const { createComponentesxComponentes, readComponentesxComponentes, updateComponentesxComponentes, deleteComponentesxComponentes } = require('./componentes_x_componentes');
const { createFormatos, readFormatos, updateFormatos, deleteFormatos } = require('./formatos');
const { createMovilizacionesTangibles, readMovilizacionesTangibles, updateMovilizacionesTangibles, deleteMovilizacionesTangibles } = require('./movilizaciones_tangibles');
const { createMovilizacionesIntangibles, readMovilizacionesIntangibles, updateMovilizacionesIntangibles, deleteMovilizacionesIntangibles } = require('./movilizaciones_intangibles');
const { createHistorialResponsableDeUso, readHistorialResponsableDeUso, updateHistorialResponsableDeUso, deleteHistorialResponsableDeUso } = require('./historial_responsable_de_uso');
const { createHistorialResponsablesPrimarios, readHistorialResponsablesPrimarios, updateHistorialResponsablesPrimarios, deleteHistorialResponsablesPrimarios } = require('./historial_responsables_primarios');
const { createInventarios, readInventarios, updateInventarios, deleteInventarios } = require('./inventarios');
const { createInventariosxSedes, readInventariosxSedes, updateInventariosxSedes, deleteInventariosxSedes } = require('./inventarios_x_sedes');
const { createInventariosxEmpleados, readInventariosxEmpleados, updateInventariosxEmpleados, deleteInventariosxEmpleados } = require('./inventarios_x_empleados');
const { createInventariosxBienes, readInventariosxBienes, updateInventariosxBienes, deleteInventariosxBienes } = require('./inventarios_x_bienes');


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
  createEdificaciones, readEdificaciones, updateEdificaciones, deleteEdificaciones,
  createComponentesxComponentes, readComponentesxComponentes, updateComponentesxComponentes, deleteComponentesxComponentes,
  createFormatos, readFormatos, updateFormatos, deleteFormatos,
  createMovilizacionesTangibles, readMovilizacionesTangibles, updateMovilizacionesTangibles, deleteMovilizacionesTangibles,
  createMovilizacionesIntangibles, readMovilizacionesIntangibles, updateMovilizacionesIntangibles, deleteMovilizacionesIntangibles,
  createHistorialResponsableDeUso, readHistorialResponsableDeUso, updateHistorialResponsableDeUso, deleteHistorialResponsableDeUso,
  createHistorialResponsablesPrimarios, readHistorialResponsablesPrimarios, updateHistorialResponsablesPrimarios, deleteHistorialResponsablesPrimarios,
  createInventarios, readInventarios, updateInventarios, deleteInventarios,
  createInventariosxSedes, readInventariosxSedes, updateInventariosxSedes, deleteInventariosxSedes,
  createInventariosxEmpleados, readInventariosxEmpleados, updateInventariosxEmpleados, deleteInventariosxEmpleados,
  createInventariosxBienes, readInventariosxBienes, updateInventariosxBienes, deleteInventariosxBienes,
};
