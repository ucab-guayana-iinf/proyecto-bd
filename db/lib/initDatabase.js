const signale = require('signale');
const { db } = require('./index');
const { asyncForEach } = require('../@utils');
const setupQuerys = require('./setupQuerys');

const initDatabase = () => new Promise(async (resolve, reject) => {
  await asyncForEach(setupQuerys, async ({ description, query }, i) => {
    try {
      await db.query(query);
      signale.success(`Successfully executed setup script "${description}"`);
      resolve();
    } catch (err) {
      signale.error(`Unable to execute query "${description}"`);
      reject();
    }
  });
});

module.exports = initDatabase;
