const signale = require('signale');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

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

  // run source.sql
  signale.log('running source.sql');
  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, '..', 'source.sql')),
    terminal: false,
  });

  rl.on('line', function (chunk) {
    const query = chunk.toString('ascii');
    if (
      !query.includes('/*')
      && !query.includes('*/')
      && !query.includes('--')
      && query.length > 1
      ) {
        db.query(query, function (err, sets, fields) {
        if (err) {
          signale.fatal(`X ERROR - QUERY: \n${query}`);
          signale.fatal(err);
          return;
        } 
        signale.success(`QUERY: \n${query}`);
      });
    }
  });
});

module.exports = setupDatabase;
