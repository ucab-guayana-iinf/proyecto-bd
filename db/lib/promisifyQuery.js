const signale = require('signale');

function promisifyQuery(connection, query, params = []) {
  return new Promise(async (resolve, reject) => {
    await connection.query(query, params, (error, response) => {
      if (error) {
        signale.fatal(`Error in query: ${query}\n Error message: ${error}`),
        reject(new Error(error));
      }

      resolve(response);
    });
  });
}

module.exports = promisifyQuery;