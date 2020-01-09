const getConnection = require('../../getConnection');
const promisifyQuery = require('../../promisifyQuery');
const {
  spreadObj,
  validateInput,
 } = require('../../../utils');

 const attributes = [

 ];
 const neededAttributes = attributes;

const updateBienes = async (params, onError = () => {}) => {
  // const db = await getConnection();
  //
  // const {
  //   condition,
  //   value,
  //   data,
  // } = params;
  //
  // if (!validateInput(data, neededAttributes, onError)) {
  //   return null;
  // }
  //
  // const values = spreadObj(data, attributes);
  //
  // let QUERY = `UPDATE bienes SET ${values} WHERE ${condition}${value}`;
  //
  // if (!condition) {
  //   QUERY = `UPDATE bienes SET ${values} WHERE ci=${value}`;
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

module.exports = updateBienes;
