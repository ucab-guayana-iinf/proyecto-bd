const signale = require('signale');
const { asyncForEach } = require('../utils');
const setupQuerys = require('./setupQuerys');

const setupDatabase = (db) => new Promise(async (resolve, reject) => {
  await asyncForEach(setupQuerys, async (setupQuery) => {
    const { description, query } = setupQuery;

    try {
      signale.log(`Executing: "${query}" | Description: "${description}"`);
      await db.query(query);
      signale.success(`Successfully executed "${description}"`);
      resolve();
    } catch (err) {
      signale.error(`Unable to execute query "${description}"`);
      signale.error(err);
      reject(error);
    }
  });
});

module.exports = setupDatabase;
