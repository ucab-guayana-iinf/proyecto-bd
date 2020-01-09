const { createUbicaciones, readUbicaciones, updateUbicaciones, deleteUbicaciones } = require('./ubicaciones');
const { createSede, readSedes, updateSedes, deleteSedes } = require('./sedes');
const { createUnidades, readUnidades, updateUnidades, deleteUnidades } = require('./unidades');

module.exports = {
  createUbicaciones, readUbicaciones, updateUbicaciones, deleteUbicaciones,
  createSede, readSedes, updateSedes, deleteSedes,
  createUnidades, readUnidades, updateUnidades, deleteUnidades,
};
