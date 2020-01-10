const { createUbicaciones, readUbicaciones, updateUbicaciones, deleteUbicaciones } = require('./ubicaciones');
const { createSedes, readSedes, updateSedes, deleteSedes } = require('./sedes');

module.exports = {
  createUbicaciones, readUbicaciones, updateUbicaciones, deleteUbicaciones,
  createSedes, readSedes, updateSedes, deleteSedes,
};
