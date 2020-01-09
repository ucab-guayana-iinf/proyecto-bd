const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');

// params expects:
// {
//   condition: string
//   value: string|number
// }

const deleteUnidades = async (params, onError = () => {}) => {
  // const db = await getConnection();
  //
  // const {
  //   condition,
  //   value,
  // } = params;
  //
  // let QUERY = `DELETE FROM ubicaciones WHERE ${condition}${value}`;
  //
  // if (!condition) {
  //   QUERY = `DELETE FROM ubicaciones WHERE codigo_ubicacion=${value}`;
  // }
  //
  // console.log(QUERY);
  //
  // try {
  //   const response = await promisifyQuery(db, QUERY);
  //   return response;
  // } catch (error) {
  //   onError(error.message);
  //   return null;
  // }
};

module.exports = deleteUnidades;
