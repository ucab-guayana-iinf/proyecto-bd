const signale = require('signale');
const setupDatabase = require('./setupDatabase');

const getConnection = async () => {
  try {
    const connection = await setupDatabase(false);
    return connection;
  } catch (error) {
    signale.fatal(error);
    return null;
  }
};

module.exports = getConnection;
