const signale = require('signale');
const db = require('./index');

const getConnection = async () => {
  try {
    await db.connect();
  } catch (error) {
    signale.fatal(error);
    return null;
  }

  return db;
};

module.exports = getConnection;
