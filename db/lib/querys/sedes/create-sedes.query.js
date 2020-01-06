const promisifyQuery = require('../../promisifyQuery');
const spread = require('../../../utils');

// expects:
// {
//   description: string
//   direccion: id (proveniente de la tabla de ubicaciones)
// }

const attributes = [
  'descripcion',
  'direccion',
];

// eslint-disable-next-line
export const createSede = async (db, params) => {
  const QUERY = `INSERT INTO 'sedes' ${spread(attributes)} VALUES ${spread(params)}`;
  const response = await promisifyQuery(db, QUERY);
  return response;
};
