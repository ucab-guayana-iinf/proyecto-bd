const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');

const deleteFacturasActivosTangibles = async (params, onError = () => {}) => {
  const db = await getConnection();

  const {
    condition,
    value,
  } = params;

  let QUERY = `DELETE FROM facturas_activos_tangibles WHERE ${condition}${value}`;

  if (!condition) {
    QUERY = `DELETE FROM facturas_activos_tangibles WHERE numero_factura=${value}`;
  }

  console.log(QUERY);

  try {
    const response = await promisifyQuery(db, QUERY);
    return response;
  } catch (error) {
    onError(error.message);
    return null;
  }
};

module.exports = deleteFacturasActivosTangibles;
