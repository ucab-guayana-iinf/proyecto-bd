const signale = require('signale');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const db = require('./index');
const { asyncForEach } = require('../utils');
const setupQuerys = require('./setupQuerys');

let connection = null;

const setupDatabase = (runScripts = true) => new Promise(async (resolve, reject) => {
  if (connection && !runScripts) {
    return resolve(connection)
  }

  await db.connect((err) => {
    if (err) {
      const error = new Error('Error connecting to database');
      signale.error(error);
    } else {
      signale.success('Connection to DB stablished')
    }
  });

  await asyncForEach(setupQuerys, async (setupQuery) => {
    const { description, query } = setupQuery;

    try {
      runScripts && signale.log(`Executing: "${query}" | Description: "${description}"`);
      await db.query(query);
      runScripts && signale.success(`Successfully executed "${description}"`);
    } catch (err) {
      runScripts && signale.fatal(`Unable to execute query "${description}"`);
      runScripts && signale.fatal(err);
    }
  });

  if (runScripts) {
    // run source.sql
    signale.log('running source.sql');
    const sourcePath = path.join(process.cwd(), '/db/source.sql');
    console.log(`DB Source path: ${sourcePath}`);
    const rl = readline.createInterface({
      input: fs.createReadStream(sourcePath),
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
  }

  connection = db;
  resolve(connection);
});

module.exports = setupDatabase;
