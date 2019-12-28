import signale from 'signale';
import db from '../';
import promisifyQuery from '../promisifyQuery';

const getUsers = async () => {
  try {
    await db.connect();
  } catch (error) {
    signale.error(error);
  }

  const response = await promisifyQuery(db, `SELECT 1;`);

  return response;
};

export { getUsers };
